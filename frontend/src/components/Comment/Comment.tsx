/**
 * Component that represents a single comment.
 * It displays the comment text, date, and the user who posted it.
 */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from "./Comment.module.css"
import formatDate from '../../helper/FormateDate'
export default function Comment({ text, date, user }: { text: String, date: Date, user: String }) {
  const [userName, setUserName] = useState()
  useEffect(() => {
    if (user) {
      axios.get(process.env.REACT_APP_BACKEND_URL+"/api/users/" + user).then(response => {
        setUserName(response.data.name)
      })
    }
  }, [])
  date = new Date(date)
  return (
    <div className={styles.container}>
      <div className={styles.container1}>
        <div className={styles.userName}>{userName}</div>
        <div className={styles.text}>{text}</div>
      </div>
      <div className={styles.date}>{formatDate(date)}</div>
    </div>
  )
}
