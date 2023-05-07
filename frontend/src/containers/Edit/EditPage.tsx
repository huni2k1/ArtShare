/* This file contains the implementation of the EditPage component,
 which displays a form for editing an artwork's description and category labels,
 and allows the user to upload an image of the artwork to be stored on Firebase Storage.
It also makes use of the GetCategories helper function to retrieve the available category labels.
*/
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import styles from "./EditPage.module.css"
import Select from "react-select";
import React from "react";
import GetCategories from "../../helper/GetCategories";
import { storage } from "../..";
import { ref, uploadBytes, uploadString } from "firebase/storage";

export default function EditPage() {
    const navigate = useNavigate();
    const { state } = useLocation()
    const [imgUrl, setImgUrl] = useState(state.img)
    const [description, setDescription] = useState("")
    const [categories, setCategories] = useState([]);
    const [selectedLabel, setSelectedLabel] = useState<any>([])
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        axios.post(process.env.REACT_APP_BACKEND_URL+'/api/artworks', { description: description, likes: 0, user: localStorage.getItem("userID"), category: selectedLabel[0]?.name || "" }).then(response => {
            const storageRef = ref(storage, response.data._id);
            uploadString(storageRef, imgUrl).then((snapshot) => {
                console.log('Uploaded a raw string!');
                navigate("/home")
            });
        }).catch(error => {
            console.log(error.message);
            console.log(error.response.status)
        })
    };
    useEffect(() => {
        async function fetchCategories() {
            const data = await GetCategories();
            const modifiedData = data.map((category: { name: any; label: any; }) => ({ name: category.name.toLowerCase(), label: category.name }));
            setCategories(modifiedData);
        }
        fetchCategories();
    }, []);
    return (
        <div>
            <div className="menu-bar">
                <Link style={{ fontFamily: "unset", textDecoration: "none", color: "black", fontWeight: "400", fontSize: 15, padding: "5px 15px 5px 15px" }} to="/home">Explore</Link>
                <Link style={{ fontFamily: "unset", textDecoration: "none", color: "black", fontWeight: "400", fontSize: 15, padding: "5px 15px 5px 15px", backgroundColor: "#01d28e", borderRadius: 30 }} to="/generate">Create</Link>
                <Link style={{ fontFamily: "unset", textDecoration: "none", color: "black", fontWeight: "400", fontSize: 15, padding: "5px 15px 5px 15px" }} to="/generate">Collection</Link>

            </div>
            <div className={styles.mainPage}>
                <div className={styles.artworkContainer}>
                    <img src={`data:image/jpeg;base64,${imgUrl}`} className={styles.artwork}></img>
                </div>
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit} className={styles.postForm}>
                        <div className={styles.description}>Description</div>
                        <textarea required className={styles.descriptionInput} rows={5} cols={100} name="description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                        <label>Labels:</label>
                        <Select
                            isMulti
                            onChange={(e: any) => {
                                setSelectedLabel(e)
                            }}
                            value={selectedLabel}
                            options={categories}
                        />
                        <div className="button-container">
                            <input type="submit" value="Post" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
