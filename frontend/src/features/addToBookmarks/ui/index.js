import React, {useEffect, useState} from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import styles from './styles.module.css'
import {useDispatch, useSelector} from "react-redux";
import {addBookmark, articleSelectors} from "../../showArticles/model/slice.js";
import {userAuthSelectors} from "../../../store/userAuthSlice/slice.js";
import {LoginModal} from "../../loginModal/index.js";


export const AddToBookMarks = ({articleId, authUserId}) => {
    const [isOpen, setIsOpen] = useState(false)
    articleId = String(articleId)
    const dispatch = useDispatch()
    const userBookmarks = useSelector(state => articleSelectors.getUserBookmarks(state))
    const isAuth = useSelector(state => userAuthSelectors.getIsUserAuth(state))
    const [isInBookmarks, setIsInBookmarks] = useState(false)
    useEffect(() => {
        if(userBookmarks.includes(articleId)){
            setIsInBookmarks(true)
        }
    }, [userBookmarks])

    const addToBookMarks = () => {
        if(!isAuth){
            return setIsOpen(true)
        }
        dispatch(addBookmark(articleId))
        if(isInBookmarks){
            setIsInBookmarks(false)
        }else{
            setIsInBookmarks(true)
        }
    }
    return (
        <div className={styles.bookmark}>
            {isInBookmarks
                ? <BookmarkIcon className={`${styles.bookmarkIcon} ${styles.bookmarkAddedColor}`} onClick={addToBookMarks}/>
                : <BookmarkBorderIcon className={styles.bookmarkIcon} onClick={addToBookMarks}/>
            }
            {isOpen && <LoginModal isModalVisible={isOpen} setModalVisible={setIsOpen} closeHandler={() => setIsOpen(false)}/>}
        </div>
    );
}
