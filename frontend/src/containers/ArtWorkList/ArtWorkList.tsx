import axios from 'axios';
import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import Toggle from 'react-toggle';
import { storage } from '../..';
import styles from './ArtWorkList.module.css';

export default function ArtWorkList() {
    const [query, setQuery] = useState('');
    const [checked, setChecked] = useState(true);
    const [artWorks, setArtWorks] = useState<any>([])
    const [filteredArtwork, setFilteredArtwork] = useState<any>([])

    useEffect(() => {
        axios.get('http://localhost:300/api/artworks')
            .then(response => {
                let promises = response.data.map((artWork: any) => {
                    return getDownloadURL(ref(storage, artWork._id)).then((url) => {
                        return axios.get(url);
                    }).then(response => {
                        artWork.base64 = response.data
                        return artWork
                    }).catch(error => {
                        console.log("Error ")
                        return artWork
                    })
                })
                Promise.all(promises).then((artWorks) => {
                    setArtWorks(artWorks);
                    setFilteredArtwork(artWorks)
                });
            })
    }, [])
    const handleSearch = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const filtered = artWorks.filter((artwork: { description: string; }) => {
            return artwork.description.toLowerCase().includes(query.toLowerCase());
        });
        setFilteredArtwork(filtered);
    };
    const handleQueryChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setQuery(event.target.value);
    };
    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <AiOutlineSearch className="" />
                <form onSubmit={handleSearch} >
                    <input required className={styles.searchBar} type="text" name="prompt" value={query} onChange={handleQueryChange}>
                    </input>
                </form>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Likes</th>
                        <th>User</th>
                        <th>Comment</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredArtwork.map((artwork: any) => (
                        <tr key={artwork._id}>
                            <td>{artwork._id}</td>
                            <td><img src={`data:image/jpeg;base64,${artwork.base64}`} className={styles.artWork} onClick={() => { }} /></td>
                            <td>{artwork.description}</td>
                            <td>{artwork.likes}</td>
                            <td>{artwork.user}</td>
                            <td>{artwork.comments}</td>
                            <td>
                                <label>
                                    <Toggle
                                        defaultChecked={checked}
                                        icons={false}
                                        onChange={() => setChecked(!checked)} />
                                    <span>{checked ? "Active" : "Banned"}</span>
                                </label>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
