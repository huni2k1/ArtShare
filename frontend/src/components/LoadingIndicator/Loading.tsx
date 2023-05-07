/**
This component displays a loading animation using the BeatLoader from the 'react-spinners' library.
*/
import React from 'react'
import BeatLoader from 'react-spinners/BeatLoader'
import styles from "./Loading.module.css"

export default function Loading() {
    return (
        <div className={styles.loadingContainer}><BeatLoader size={23} color="#01d28e" /></div>
    )
}
