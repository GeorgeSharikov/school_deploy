import React from 'react';
import {useSelector} from "react-redux";
import {userAuthSelectors} from "../../store/userAuthSlice/slice.js";
import {useNavigate, useParams} from "react-router-dom";
import styles from './styles.module.css'
import {ChangePassword} from "../../features/changePassword/index.jsx";

export const UserSetting = (props) => {
    const navigate = useNavigate()

    const {id} = useParams()
    const personalId = useSelector(state => userAuthSelectors.getUserPersonalId(state))
    if(Number(id) !== Number(personalId)){
        navigate('/error-page-not-found')
    }
    document.title = `Настройки`
    return (
        <div className={styles.wrapper}>
            <ChangePassword />
        </div>
    );
}
