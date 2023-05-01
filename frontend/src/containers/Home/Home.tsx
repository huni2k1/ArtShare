import { useEffect, useState } from 'react';
import styles from "./Home.module.css"
import { AiOutlineDown } from "react-icons/ai";
import InfiniteScroll from 'react-infinite-scroll-component';
import ArtWork from '../../components/ArtWork/ArtWork';
import React from 'react';
import axios from 'axios';
import MenuBar from '../../components/MenuBar/MenuBar';
import filterArtWork from '../../helper/FilterArtWork';
import GetUserName from '../../helper/GetUserName';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../components/LoadingIndicator/Loading';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../..';
import { isLoggedIn } from '../../helper/IsLoggedIn';
export default function Home() {
    const [dropDown, setDropdown] = useState("New & Noteworthy")
    const [hasMore, setHasMore] = useState(false)
    const [artWorks, setArtWorks] = useState<any>([])
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const items = ["New & Noteworthy", "Popular", "Following"]
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    useEffect(() => {

        axios.get(process.env.REACT_APP_BACKEND_URL + '/api/artworks')
            .then(response => {
                let promises = response.data.map((artWork: any) => {
                    return Promise.all([GetUserName(artWork.user), getDownloadURL(ref(storage, artWork._id))]).then(([userName, url]) => {
                        artWork.userName = userName
                        return axios.get(url);
                    }).then(response => {
                        artWork.base64 = response.data
                        return artWork
                    }).catch(error => {
                        console.log("Error ")
                        return artWork
                    })
                });
                Promise.all(promises).then((artWorks) => {
                    // const filteredArtworks = artWorks.filter(artWork => {
                    //     if (searchQuery) {
                    //         return artWork.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    //             artWork.category?.toLowerCase().includes(searchQuery.toLowerCase());
                    //     } else {
                    //         return true
                    //     }
                    // });
                    setArtWorks(artWorks);
                    setLoading(false);
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, [])
    useEffect(() => {
        let filteredArtWorks = filterArtWork(dropDown, artWorks)
        setArtWorks(filteredArtWorks)
    }, [dropDown])
    function toggleOpen() {
        setIsOpen(!isOpen);
    }
    function fetchArtWork(): any {
    }
    if (!isLoggedIn()) {
        return <Navigate to="/" replace />;
    }
    return (
        <div>
            <MenuBar page="home" />
            <div className={styles.mainPage}>
                <div className={styles.dropdownMenu}>
                    <button onClick={toggleOpen} className={styles.dropdownButton}>
                        {dropDown}
                        <AiOutlineDown className={styles.dropdownIcon} />
                        <div></div>
                    </button>
                    {isOpen && (
                        <ul className={styles.dropDownList}>
                            {items.map(item => (
                                <li className={item == dropDown ? styles.dropDownItemSelected : styles.dropDownItem} key={item} onClick={() => {
                                    setDropdown(item)
                                    setIsOpen(false)
                                }}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {loading && <Loading />}
                <InfiniteScroll next={() => fetchArtWork()} hasMore={hasMore} loader={<h3>Loading...</h3>} dataLength={artWorks.length}>
                    <ul className={styles.artWorkContainer}>
                        {artWorks.map((artWork: any) => {
                            return (
                                <li className={styles.artWork} key={artWork._id}>
                                    <ArtWork artWorkID={artWork._id} imgURL={`data:image/jpeg;base64,${artWork.base64}`} userName={artWork.userName} likes={artWork.likes} />
                                </li>)
                        })}
                    </ul>
                </InfiniteScroll>
            </div>
        </div>
    )
}

