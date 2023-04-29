import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsDownload, BsHeartFill } from 'react-icons/bs'
import { FaComment } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import styles from "./ArtWorkModal.module.css"
import Comment from '../../components/Comment/Comment'
import { handleDownloadClick } from '../../helper/HandleDownloadClick'
import getDefaultImage from '../../helper/GetDefaultImage'
import Loading from '../../components/LoadingIndicator/Loading'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../..'
export default function ArtWork() {
  const { id } = useParams()
  const [artWork, setArtWork] = useState<any>({})
  const [liked, setLiked] = useState(false)
  const [name, setName] = useState()
  const [comments, setComments] = useState<any>([])
  const [commentInput, setCommentInput] = useState<any>()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL+'/api/artworks/' + id).then(response => {
      setArtWork(response.data[0])
      return response.data[0]
    }).then(response => {
      axios.get(process.env.REACT_APP_BACKEND_URL+'/api/users/' + response.user).then(response => {
        setName(response.data.name)
      })
      getDownloadURL(ref(storage, id)).then(url=>{
        axios.get(url).then(response=>{
          setArtWork((artWork: any)=>{return {...artWork,base64:response.data}})
        })
        })
    }).then(response => {
      axios.get(process.env.REACT_APP_BACKEND_URL+'/api/comments/' + id).then(response => {
        setComments(response.data)
        setLoading(false)
      })
    })
  }, [])
  const handleLikeClick = () => {
    if (!liked) {
      setLiked(true)
      setArtWork({ ...artWork, likes: artWork.likes + 1 })
      axios.post(process.env.REACT_APP_BACKEND_URL+"/api/artworks/like", { userID: localStorage.getItem("userID"), artWorkID: id }).then(response => {
      })
    }
    else {
      setLiked(false)
      setArtWork({ ...artWork, likes: artWork.likes - 1 })
      axios.post(process.env.REACT_APP_BACKEND_URL+"/api/artworks/unlike", { id: id }).then(response => {
      })
    }
  }
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setCommentInput("")
    setArtWork({ ...artWork, comments: artWork.comments + 1 })
    axios
      .post(process.env.REACT_APP_BACKEND_URL+"/api/comments", { artWork_id: id, user_id: localStorage.getItem("userID"), text: commentInput, createdAt: new Date() })
      .then(response => {
        setComments([...comments, response.data])
      }).catch(err => {
        console.log(err)
      })
  }
  return (
    <div className={styles.container}>
      {loading && <Loading/>}
      {!loading && <div>
        <div>
          <div className={styles.userInforContainer}>
          <img src={getDefaultImage()} className={styles.userImage}></img>
          <div>{name}</div>
          </div>
          <div className={styles.description}>{artWork.description}</div>
        </div>
        <div className={styles.imageContainer}>
          {artWork.base64 && <img src={`data:image/jpeg;base64,${artWork.base64}`} className={styles.artWork}></img>
          }
        </div>
        <div className={styles.iconContainer}>
          <div className={styles.likeContainer}>
            <BsHeartFill className={liked ? styles.likedIcon : styles.likeIcon} onClick={handleLikeClick} />
            <div>{artWork.likes}</div>
          </div>
          <div className={styles.commentContainer}>
            <FaComment className={styles.commentIcon} />
            <div>{artWork.comments||0}</div>
          </div>
          <div>
          <BsDownload className={styles.downloadIcon} onClick={()=>handleDownloadClick(`data:image/jpeg;base64,${artWork.base64}`)} />
          </div>
        </div>
        <div>
          <ul className={styles.commentContainer2}>
            {comments.map((comment: any, index: number) => (
              <li key={index} className={styles.comment}>
                <Comment text={comment.text} date={comment.createdAt} user={comment.user_id}></Comment>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <input required className={styles.commentInput}  placeholder="Add comment..." type="text" name="prompt" value={commentInput} onChange={(e) => { setCommentInput(e.target.value) }}></input>
            <div className="button-container">
              <input type="submit" value="Post comment" />
            </div>
          </form>
        </div>
      </div>}
    </div>
  )
}
