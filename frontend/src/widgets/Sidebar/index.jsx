import styles from './ui/style.module.css'
import {Link, NavLink} from "react-router-dom";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import {useEffect, useRef} from "react";
import {useOnClickOutside} from "../../shared/hooks/useClickOutside.jsx";
import {useActions} from "../../shared/hooks/useActions.jsx";
import {toggleActions} from "../../features/sidebarToggle/model/slice.js";
import {SidebarToggle} from "../../features/sidebarToggle/index.jsx";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import {userAuthSelectors} from "../../store/userAuthSlice/slice.js";
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

export const SideBar = () => {
    const {setActive} = useActions(toggleActions)
    const isAuth = useSelector(state => userAuthSelectors.getIsUserAuth(state))
    const isUserAdmin = useSelector(state => userAuthSelectors.getIsUserAdmin(state))

    const ref = useRef()
    const handleClose = (event) => {
        if(window.innerWidth < 859){
            setActive()
        }
    }

    useOnClickOutside(ref, handleClose)

    useEffect(() => {
        if(window.innerWidth < 859){
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "auto";
        }
    }, [window.innerWidth])
    return (
        <>
        <div className={styles.container} ref={ref} style={{pointerEvents: 'auto'}}>
            <div className={styles.wrapper} >
                <div className={styles.sideBarHeader}>
                    <div className={styles.sideBarHeaderBurger}>
                        <SidebarToggle />
                    </div>
                    <Box className={styles.sideBarHeaderLogo} onClick={handleClose}>
                        <Link to={'/'} style={{color: 'black', paddingRight: '20px', userSelect: 'none' , fontSize: '20px'}} >
                            <span>Лицей</span>
                            Days
                        </Link>
                    </Box>
                </div>
                <div className={styles.sideBar}>
                    <div className={styles.element} onClick={handleClose}>
                        <NavLink to={'/'}  className={({ isActive }) => isActive ? styles.activeLink : styles.link}>
                            <ArticleOutlinedIcon className={styles.itemsIcons}/>
                            <p>Статьи</p>
                        </NavLink>
                    </div>
                    {isAuth && <div className={styles.element} onClick={handleClose}>
                        <NavLink to={'/bookmarks'}
                                 className={({isActive}) => isActive ? styles.activeLink : styles.link}>
                            <BookmarkBorderOutlinedIcon className={styles.itemsIcons}/>
                            <p>Закладки</p>
                        </NavLink>
                    </div>}
                    <div className={styles.element} onClick={handleClose}>
                        <NavLink to={'/about'} className={({ isActive }) => isActive ? styles.activeLink : styles.link}>
                            <PeopleOutlineOutlinedIcon className={styles.itemsIcons}/>
                            <p>О нас</p>
                        </NavLink>
                    </div>
                    {isUserAdmin &&<>
                    <div className={styles.element} onClick={handleClose}>
                        <NavLink to={'/moderation'} className={({isActive}) => isActive ? styles.activeLink : styles.link}>
                            <LibraryAddCheckIcon className={styles.itemsIcons}/>
                            <p>Модерация</p>
                        </NavLink>
                    </div>
                     <div className={styles.element} onClick={handleClose}>
                        <NavLink to={'/admin-panel/registration'} className={({isActive}) => isActive ? styles.activeLink : styles.link}>
                            <PeopleOutlineOutlinedIcon className={styles.itemsIcons}/>
                            <p>Админ панель</p>
                        </NavLink>
                     </div>
                    </>}
                </div>
            </div>

        </div>
         <div className={styles.sidebarTint}></div>
        </>
    )
}