import React from 'react';
import styles from './styles.module.css'
import {NavLink, Outlet} from "react-router-dom";

export const AdminPanel = (props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <NavLink to="/user-creation" className={styles.tab}>
                    <span>Добавить пользоваетля</span>
                </NavLink>
                <NavLink to="users-list" className={styles.tab}>
                    <span>Список пользователей</span>
                </NavLink>
                <NavLink to="articles-list" className={styles.tab}>
                    <span>Список статей</span>
                </NavLink>
            </div>
            <div className={styles.body}>
                <Outlet />
            </div>
        </div>
    );
}
