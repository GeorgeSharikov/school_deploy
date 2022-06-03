import {NavLink, Outlet, useLocation, useParams} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userAuthSelectors } from "../../store/userAuthSlice/slice";
import { getOtherPersonalData, getPersonalData, personalDataSelectors } from "../../store/userPersonalData/slice";
import {useEffect, useState} from "react";
import styles from './styles.module.css'
import { ProfileAvatar } from "../../features/avatar";
import { ProfileStatus } from "../../features/status";
import {useNavigate} from "react-router-dom";
import {sideBarSelectors} from "../../features/sidebarToggle/model/slice.js";

export const Profile = (props) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const {id} = useParams()
    const myId = useSelector(state => userAuthSelectors.getUserPersonalId(state))
    const isAuth = useSelector(state => userAuthSelectors.getIsUserAuth(state))

    const isMyOwn = Number(id) === myId
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    useEffect(() => {
        if(isMyOwn){
            dispatch(getPersonalData())
        }else{
            if(((myId !== null && isAuth) || !isAuth) && id!==null){
                dispatch(getOtherPersonalData({id}))
            }

        }
    }, [isMyOwn,myId,dispatch])
    const path = location.pathname.split('/')
    useEffect(() => {
        if(!isMyOwn && myId !== null && id!==null && path[path.length - 1] === 'drafts'){
            console.log('here')
            return navigate('/')
        }
    }, [location.pathname, myId])

    const checkIfActive = () => {
        const path = location.pathname.split('/')
        if(path[path.length - 1] !== 'drafts'){
            return `${styles.tab} ${styles.tabActive}`
        }
        return `${styles.tab}`
    }
    const userData = useSelector(state => personalDataSelectors.getPeronalDataSelector(state, isMyOwn))
    return (
        <div className={styles.wrapper} >
            <div className={styles.profileHeaderWrapper}>
                    <ProfileAvatar ava={userData.avatar} />
                    <h1 className={styles.name}>{userData.firstName}{userData.lastName}</h1>
                    <ProfileStatus status={userData.status}/>
                    <div className={styles.headerTabs}>
                        <div className={styles.tabsList}>
                            <NavLink to="" className={checkIfActive}>
                                <span>Статьи</span>
                            </NavLink>
                            {isMyOwn && <NavLink to='drafts' className={({isActive}) => isActive ? `${styles.tab} ${styles.tabActive}` : `${styles.tab}`}>
                                <span>Черновики</span>
                            </NavLink>}
                        </div>
                    </div>
            </div>

            <div className={styles.profileContentWrapper}>
                <div className={styles.articlesWrapper}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
