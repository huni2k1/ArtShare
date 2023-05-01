import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import getDefaultImage from '../../helper/GetDefaultImage'
import styles from "./MenuBar.module.css"
export default function MenuBar({ page }: { page: string }) {
    const navigate = useNavigate();
    const [searchVal, setSearchVal] = useState("")
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        navigate("/home?" + "search=" + searchVal)
    };
    const [isOpen, setIsOpen] = useState(false);
    const linkStyle = { fontFamily: "unset", textDecoration: "none", color: "black", fontWeight: "400", fontSize: 15, padding: "5px 15px 5px 15px" }
    const currLinkStyle = { fontFamily: "unset", textDecoration: "none", color: "black", fontWeight: "400", fontSize: 15, padding: "5px 15px 5px 15px", backgroundColor: "#01d28e", borderRadius: 30 }
    return (
        <div className={styles.menuBar}>
            <div>
                <Link style={page == "home" ? currLinkStyle : linkStyle} to="/home">Explore</Link>
                <Link style={page == "create" ? currLinkStyle : linkStyle} to="/generate">Create</Link>
                <Link style={page == "collection" ? currLinkStyle : linkStyle} to={"/" + localStorage.getItem("name")}>Collection</Link>
            </div>
            <div className={styles.form}>
                <AiOutlineSearch className={styles.icon} />
                <form onSubmit={handleSubmit} >
                    <input required className={styles.searchBar} type="text" name="prompt" value={searchVal} onChange={(e) => { setSearchVal(e.target.value) }}>
                    </input>
                </form>
            </div>
            <div>
            <div className={styles.userAvaContainer} onClick={() => { setIsOpen(!isOpen); }}>
                <div>{localStorage.getItem("name")}</div>
                <img src={getDefaultImage()} className={styles.userImage}></img>
            </div>
            {isOpen && (
                <ul className={styles.dropDownList}>
                    <li className={styles.dropDownItem} onClick={()=>{
                        localStorage.clear()
                        navigate("/")
                    }}>Sign Out</li>
                </ul>)}              
            </div>
        </div>
    )
}
