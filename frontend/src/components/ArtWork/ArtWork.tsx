import React, { useState } from 'react'
import styles from './ArtWork.module.css'
import { BsHeartFill } from 'react-icons/bs'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BsDownload } from 'react-icons/bs';
import { handleDownloadClick } from '../../helper/HandleDownloadClick'

interface ArtWorkProps {
  imgURL: string
  userName: string
  likes: number
  artWorkID: string
}

export default function ArtWork({ imgURL, userName, likes, artWorkID }: ArtWorkProps) {
  const [liked, setLiked] = useState(false)
  const [numLikes, setNumLikes] = useState(likes)
  const navigate = useNavigate()

  const handleLikeClick = () => {
    setLiked(!liked)
    setNumLikes(liked ? numLikes - 1 : numLikes + 1)
    axios.post(process.env.REACT_APP_BACKEND_URL+`/api/artworks/${liked ? "unlike" : "like"}`, { userID: localStorage.getItem("userID")?.toString(), artWorkID }).then(({ status }) => {
    })
  }

  return (
    <div className={styles.container}>
      <img src={imgURL} className={styles.artWork} onClick={() => navigate(`/artwork/${artWorkID}`)} />
      <div className={styles.container2}>
        <div className={styles.name} onClick={() => navigate(`/${userName}`)}>{userName}</div>
        <div className={styles.container3}>
          <BsHeartFill className={liked ? styles.likedIcon : styles.likeIcon} onClick={handleLikeClick} />
          <div>{numLikes}</div>
          <BsDownload className={styles.downloadIcon} onClick={()=>handleDownloadClick(imgURL)} />
        </div>
      </div>
    </div>
  )
}
