import React, {useEffect, useRef, useState} from 'react';
import styles from "./ui/styles.module.css";
import {FormStyled} from "../search/ui/styledComponents.js";
import {UserApi} from "../../shared/api/api.js";
import {useSelector} from "react-redux";
import {userAuthSelectors} from "../../store/userAuthSlice/slice.js";
import {NotificationManager} from "react-notifications";

export const ChangePassword = (props) => {
    const [value, setValue] = useState('')
    const inputRef = useRef()

    const showPassword = () => {
        if(inputRef.current.type === 'password'){
            inputRef.current.type = 'text'
        }else{
            inputRef.current.type = 'password'
        }
    }

    const changePassword = async (e) => {
        try {
            e.preventDefault()
            await UserApi.changePassword(value)
            console.log(value)
            NotificationManager.success('Пароль изменен', '', 2000)
        }catch (e) {
            console.log(e)
            NotificationManager.error('Ошибка', '', 2000)
        }finally {
            setValue('')
        }
    }
    
    useEffect(() => {
        return () => {
            setValue('')
        }
    }, [])

    return (
        <div className={styles.changePassword}>
                <form onSubmit={changePassword}>
                    <label>
                        <p className={styles.title}>Изменение пароля</p>
                        <FormStyled>
                            <input className={styles.input}
                                   style={{ borderRadius: '5px', paddingLeft: '10px', height: '42px'}}
                                   type={'password'}
                                   value={value}
                                   onChange={(e) => setValue(e.target.value)}
                                   autoFocus={true}
                                   ref={inputRef}
                            />
                        </FormStyled>
                    </label>
                </form>
                <div>
                    <label >
                        <input type={'checkbox'} value={'Показать пароль'} onClick={showPassword}/>
                        <span>Показать пароль</span>
                    </label>
                </div>
                <div className={styles.button} onClick={changePassword}>Изменить пароль</div>
        </div>
    );
}
