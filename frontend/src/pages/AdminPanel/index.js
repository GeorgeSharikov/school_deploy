import React from 'react';
import styles from './styles.module.css'
import {NavLink, Outlet} from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import NewspaperIcon from '@mui/icons-material/Newspaper';

export const AdminPanel = (props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <NavLink to="registration" className={({isActive}) => isActive ?`${styles.tab} ${styles.activeTab}` : styles.tab}>
                    <span>Добавить пользоваетля</span>
                    <AddCircleIcon sx={{marginLeft: '5px'}}/>
                </NavLink>
                <NavLink to="users-list" className={({isActive}) => isActive ?`${styles.tab} ${styles.activeTab}` : styles.tab}>
                    <span>Список пользователей</span>
                    <RecentActorsIcon sx={{marginLeft: '5px'}}/>
                </NavLink>
                <NavLink to="articles-list" className={({isActive}) => isActive ?`${styles.tab} ${styles.activeTab}` : styles.tab}>
                    <span>Список статей</span>
                    <NewspaperIcon sx={{marginLeft: '5px'}}/>
                </NavLink>
            </div>
            <div className={styles.body}>
                <Outlet />
            </div>
        </div>
    );
}
