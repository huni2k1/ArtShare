import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ArtWork from '../../components/ArtWork/ArtWork'
import MenuBar from '../../components/MenuBar/MenuBar'
import getDefaultImage from '../../helper/GetDefaultImage'
import styles from "./Collection.module.css"
import { useParams } from 'react-router-dom'
import follow from '../../helper/Follow'
import getUserID from '../../helper/GetUserID'
import GetUserName from '../../helper/GetUserName'
import Loading from '../../components/LoadingIndicator/Loading'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../..'
export default function () {
    const { userName } = useParams()
    const [showMode, setShowMode] = useState("created")
    const [artWorks, setArtWorks] = useState<any>([])
    const [loading, setLoading] = useState<any>([])
    const [follower, setFollower] = useState([])
    const [following, setFollowing] = useState([])
    useEffect(() => {
        setLoading(true);
        setArtWorks([]);
        async function getArtWorks() {
            const responsee = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/getID/${userName}`)
            let userID = responsee.data.id
            let response;
            let promises;
            if (showMode == "created") {
                response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/artworks?user='+userID);
                console.log(response.data)
                promises = response.data.map(async (artWork: any) => {
                    const url = await getDownloadURL(ref(storage, artWork._id));
                    const base64Response = await axios.get(url);
                    artWork.base64 = base64Response.data;
                    return artWork;
                });
                Promise.all(promises)
                    .then(artWorks => {
                        setArtWorks(artWorks);
                        setLoading(false)
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else if (showMode == "liked") {
                response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/users/postLiked', { userID: userID });
                promises = response.data.map(async (artWork: any) => {
                    const [userName, url] = await Promise.all([GetUserName(artWork.user), getDownloadURL(ref(storage, artWork._id))]);
                    artWork.userName = userName;
                    const base64Response = await axios.get(url);
                    artWork.base64 = base64Response.data;
                    return artWork;
                });
                Promise.all(promises)
                .then(artWorks => {
                    setArtWorks(artWorks);
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error);
                });
            }
            return 1
        }
        getArtWorks()
        axios.get(process.env.REACT_APP_BACKEND_URL + "/api/relationships/" + localStorage.getItem("userID")).then(response => {
            setFollower(response.data.follower);
            setFollowing(response.data.followee);
        });
    }, [showMode]);
    return (
        <div className={styles.container}>
            <MenuBar page="collection" />
            <div className={styles.container2}>
                <div>
                    <img src={getDefaultImage()} className={styles.userImage}></img>
                </div>
                <div>
                    {localStorage.getItem("email")}
                </div>
                <div>
                    {userName}
                </div>
                {userName != localStorage.getItem("name") &&
                    <div className={styles.followButton} onClick={async () => {
                        let userID = await getUserID(String(userName))
                        follow(localStorage.getItem("userID"), userID)
                    }}>Follow</div>}
                <div><div className={styles.bold}>{follower.length}</div> Follower</div>
                <div><div className={styles.bold}>{following.length}</div> Following</div>
            </div>
            <div className={styles.container1}>
                <div className={showMode == "created" ? styles.createdSelected : styles.created} onClick={() => { setShowMode("created") }}>Created</div>
                <div className={showMode == "liked" ? styles.likedSelected : styles.liked} onClick={() => { setShowMode("liked") }}>Liked</div>
            </div>
            {loading && <Loading />}
            <div>
                <ul className={styles.artWorkContainer}>
                    {artWorks.map((artWork: any) => (
                        <li className={styles.artWork} key={artWork._id}>
                            <ArtWork artWorkID={artWork._id} imgURL={`data:image/jpeg;base64,${artWork.base64}`} userName={artWork.userName} likes={artWork.likes} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
