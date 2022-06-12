import React, {useEffect, useState} from 'react';
import {UserApi} from "../../../shared/api/api.js";
import LockResetIcon from '@mui/icons-material/LockReset';
import styles from './styles.module.css'
import {Link} from "react-router-dom";
import {NotificationManager} from "react-notifications";

export const UserList = (props) => {
    const [userList, setUserList] = useState([])

    useEffect(() => {
        UserApi.getAllUsers().then((res) => {
            setUserList(res)
        })
    }, [])

    const resetPassword = async (id) => {
        try {
            await UserApi.resetUserPassword(id)
            NotificationManager.success('Пароль сброшен.','',2000)
        }catch (e) {
            NotificationManager.error('Ошибка.','',2000)
        }
    }
    document.title = `Админ панель - Список Пользователей`
    return (
        <div className={styles.wrapper}>
            {userList.map(({firstName, lastName, id, email}, index) => {
                const author = `${firstName} ${lastName}`
                return <div key={id} className={styles.wrap}>
                    <Link to={`/profile/${id}`} className={styles.itemsWrapper}>
                        <div className={styles.item} style={{width: '50px'}}>{index+1}</div>
                        <div className={styles.itemInfo}>
                            <div className={styles.item}>{author}</div>
                            <div className={styles.item}>{email}</div>
                        </div>
                    </Link>
                    <div className={styles.btn} title={'Сбрасывает пароль на 1234567'} onClick={() => resetPassword(id)}>
                        <div>Сбросить пароль</div>
                        <LockResetIcon />
                    </div>
                </div>
            })}
        </div>
    );
}
