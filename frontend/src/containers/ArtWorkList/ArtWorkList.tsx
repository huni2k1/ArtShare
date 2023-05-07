/**
 * This file defines the ArtWorkList component, which displays a table of artwork data 
 * retrieved from a backend API and Firebase Storage. The component allows searching for 
 * specific artwork by description and toggling the active status of each artwork. 
 * Artwork data is loaded asynchronously using useEffect and Promise.all, and images 
 * are loaded as base64-encoded strings using Firebase Storage's getDownloadURL method. 
 * 
 * The component relies on helper functions deactivateArtWork and activateArtWork for 
 * toggling artwork active status. 
 */

import axios from 'axios';
import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import Toggle from 'react-toggle';
import { storage } from '../..';
import styles from './ArtWorkList.module.css';
import { deactivateArtWork } from '../../helper/DeactivateArtWork';
import { activateArtWork } from '../../helper/ActivateArtWork';

export default function ArtWorkList() {
    const [query, setQuery] = useState('');
    const [checked, setChecked] = useState(true);
    const [artWorks, setArtWorks] = useState<any>([])
    const [filteredArtwork, setFilteredArtwork] = useState<any>([])
    const handleQueryChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setQuery(event.target.value);
      };
    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL+'/api/artworks/admin')
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
                    console.log(artWorks)
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
    async function handleToggleChange(artWork: any): Promise<void> {
        try {
          if (artWork.active) {
            await deactivateArtWork(artWork._id);
          } else {
            await activateArtWork(artWork._id);
          }
    
          const updatedArtWorks = artWork.map((u: any) => {
            if (u._id === artWork._id) {
              u.active = !u.active;
            }
            return u;
          });
    
          setArtWorks(updatedArtWorks);
          setFilteredArtwork(updatedArtWorks);
        } catch (error) {
          console.error(error);
        }
      }




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
                            <td>{artwork.user.id}</td>
                            <td>{artwork.comments || 0}</td>
                            <td>
                                <label>
                                    <Toggle
                                        defaultChecked={artwork.active}
                                        icons={false}
                                        onChange={() => handleToggleChange(artwork)} />
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
