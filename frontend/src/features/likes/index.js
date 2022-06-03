import React, {useEffect, useState} from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './ui/style.module.css'
import {ArticleApi} from "../../shared/api/api.js";
import {LoginModal} from "../loginModal/index.js";

export const Like = ({likesCount, likes, dislikes, articleId, authUserId}) => {
    let userId = authUserId
    const [isLiked, setIsLiked] = useState(null)
    const [count, setCount] = useState(likesCount)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if(userId){
            userId = String(userId)
            if(likes?.includes(userId)){
                setIsLiked(true)
            }
            if(dislikes?.includes(userId)){
                setIsLiked(false)
            }
        }
    },[likes, dislikes])

    const handleLike = async () => {
        try{
            if(!userId) {
                return setIsOpen(true)
            }
            const response = await ArticleApi.like(articleId)

            if(isLiked === true){
                setIsLiked(null)
            }else{
                setIsLiked(true)
            }
            setCount(response.likeCount)
        }catch (e) {
            console.log(e)
        }
    }

    const handleDislike = async () => {
        try{
            if(!userId) {
                return setIsOpen(true)
            }
            const {likeCount} = await ArticleApi.disLike(articleId)
            if(isLiked === false){
                setIsLiked(null)
            }else{
                setIsLiked(false)
            }
            setCount(likeCount)
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <div className={styles.container}>
                <div className={`${styles.arrow} ${isLiked && styles.likesGreen}`} onClick={handleLike}>
                    <ExpandLessIcon className={styles.icon}/>
                </div>
                <div className={`${styles.likeCounts} ${count === 0 ? styles.defaultColor : count > 0 ? styles.likesGreen : styles.likesRed}`}>
                    {count}
                </div>
                <div className={`${styles.arrow} ${isLiked === false && isLiked !== null && styles.likesRed}`} onClick={handleDislike}>
                    <ExpandMoreIcon className={styles.icon}/>
                </div>
            </div>
            {isOpen && <LoginModal isModalVisible={isOpen} closeHandler={() => setIsOpen(false)} setModalVisible={setIsOpen}/>}
        </>
    );
}
