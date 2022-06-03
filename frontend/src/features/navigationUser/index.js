import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { userAuthSelectors } from '../../store/userAuthSlice/slice';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import styles from './ui/styles.module.css'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Avatar} from '@mui/material';
import { personalDataSelectors } from '../../store/userPersonalData/slice';
import { LoginModal } from '../loginModal';
import Skeleton from "@mui/material/Skeleton";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useOnClickOutside} from "../../shared/hooks/useClickOutside.jsx";
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import {SmallAvatar} from "../../shared/assets/avatar/smallAvatar.jsx";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {useActions} from "../../shared/hooks/useActions.jsx";
import {userAuthActions} from "../../store/userAuthSlice/slice.js";
import {personalDataActions} from "../../store/userPersonalData/slice.js";
import {articleActions, getArticlesTotalCount, getFeedArticles} from "../showArticles/model/slice.js";
import {articlesProfileActions} from "../../pages/profileArticleFeed/model/slice.js";
import {BookmarksActions} from "../../pages/Bookmarks/model/slice.js";
import {draftsActions} from "../../pages/profileDraftsFeed/model/slice.js";
import {adminModerationActions} from "../../pages/AdminModerationFeed/model/slice.js";
import {stringToHslColor} from "../../shared/helpers/generateRandomColor.js";

export const NavigationUser = (props) => {
    const [isModalVisible, setModalVisible] = useState(false)
    const [isListOpen, setIsListOpen] = useState(false)
    const dispatch = useDispatch()

    const {logOut} = useActions(userAuthActions)
    const {setEmptyPersonalData} = useActions(personalDataActions)
    const {setEmpty} = useActions(articleActions)
    const {setProfileArticles} = useActions(articlesProfileActions)
    const {setBookmarks} = useActions(BookmarksActions)
    const {setDrafts} = useActions(draftsActions)
    const {setAdminModeration} = useActions(adminModerationActions)

    const navigate = useNavigate()

    const ref = useRef()
    useOnClickOutside(ref, () => setIsListOpen(false))

    const id = useSelector(state => userAuthSelectors.getUserPersonalId(state))
    const isAuth = useSelector(state => userAuthSelectors.getIsUserAuth(state))
    const userData = useSelector(state => personalDataSelectors.getPeronalDataSelector(state))
    const fullName = useSelector(state => personalDataSelectors.getUserFullName(state))
    const isFetching = useSelector(state => personalDataSelectors.getIsFetching(state))

    const logOutHandler = () => {
        setEmptyPersonalData()
        logOut()
        setEmpty()
        setProfileArticles()
        setBookmarks()
        setDrafts()
        setAdminModeration()
        setIsListOpen(false)
        navigate("/", { replace: true })
        dispatch(getArticlesTotalCount({isModerated: true, id: null}))
    }

    const openHandler = () => setModalVisible(true)
    const closeHandler = () => setModalVisible(false)

    return (
        <div>
            {isFetching
                ? <Skeleton variant="rectangular" width={140} height={30} />
                : isAuth ? <div className={styles.navigation}>
                        <NavLink to={`/profile/${id}`} >
                                    <Avatar sx={{backgroundColor: `${stringToHslColor(fullName, 50, 50)}`}}>{userData?.firstName?.[0]}</Avatar>
                        </NavLink>
                        <div className={styles.expand} onClick={() => setIsListOpen(true)}>
                            <ExpandMoreIcon/>
                        </div>
                        {isListOpen && <div className={styles.listContainer} ref={ref}>
                            <span className={styles.listHorizon}></span>
                            <div className={styles.list}>
                                <Link to={`/profile/${id}`} className={styles.listItem} onClick={() => setIsListOpen(false)}>
                                    <div className={styles.itemIcon}>
                                        <SmallAvatar />
                                    </div>
                                    <div className={styles.itemText}>
                                        {fullName}
                                    </div>
                                </Link>

                                <Link to={`/profile/${id}/drafts`} className={styles.listItem} onClick={() => setIsListOpen(false)}>
                                    <DraftsIcon className={styles.itemIcon}/>
                                    <div className={styles.itemText}>Черновики</div>
                                </Link>

                                <Link to={'/bookmarks'} className={styles.listItem} onClick={() => setIsListOpen(false)}>
                                     <BookmarkBorderOutlinedIcon className={styles.itemIcon}/>
                                     <div className={styles.itemText}>Закладки</div>
                                </Link>

                                <Link to={`/profile/${id}/settings`} className={styles.listItem} onClick={() => setIsListOpen(false)}>
                                    <SettingsIcon className={styles.itemIcon}/>
                                    <div className={styles.itemText}>Настройки</div>
                                </Link>

                                <div className={`${styles.listItem} ${styles.logOutIcon}`} onClick={logOutHandler}>
                                    <LogoutIcon className={styles.itemIcon}/>
                                    <div className={styles.itemText}>Выход</div>
                                </div>

                            </div>
                        </div>}
                    </div>
                    : <div className={styles.signIn} onClick={openHandler}>
                        <PersonOutlineIcon sx={{marginRight: '8px', fontSize: '30px'}}/>
                        <span>
                            Войти
                        </span>
                    </div>
            }
            {isModalVisible
            ? <LoginModal isModalVisible={isModalVisible} closeHandler={closeHandler} setModalVisible={setModalVisible}/>
            : null}
        </div>
    );
}
