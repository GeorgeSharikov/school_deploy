import React, {useEffect, useState} from 'react';
import {Field, Form, Formik} from "formik";
import styles from "./styles.module.css";
import {userAuthActions} from "../../store/userAuthSlice/slice.js";

import {useActions} from "../../shared/hooks/useActions.jsx";
import {UserApi} from "../../shared/api/api.js";
import {NotificationManager} from "react-notifications";
export const CreationUser = (props) => {
    const {setLoginError} = useActions(userAuthActions)
    const [error, setError] = useState('')
    const [validateErrors, setValidateErrors] = useState(false)

    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Почта обязательна';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Некорректная почта';
        }else if(!values.name){
            errors.name = 'Имя обязательно';
        }else if(!values.secondName){
            errors.secondName = 'Фамилия обязательна';
        }
        else if(!values.password){
            errors.password = 'Пароль обязателен';
        }
        if("email" in errors && !validateErrors){
            setValidateErrors(true)
        }
        if(!("email" in errors) && validateErrors){
            setValidateErrors(false)
        }
        return errors;
    };

    const registration = async (data, callbackSubmit, resetForm) => {
        try{
            const {email, password, name, secondName, role} = data
            console.log(email, password, name, secondName, role)
            await UserApi.registration(email, password, name, secondName)
            resetForm()
            setError('')
            NotificationManager.success('Пользователь создан', '',2000)
        }catch (e) {
            setError(e.message)
        }finally {
            callbackSubmit(false)
        }
    }

    useEffect(() => () => {
        setLoginError(false)
        setValidateErrors(false)
    }, [setLoginError])
    return (
        <div className={styles.wrapper}>
            <Formik
                initialValues={{ email: '', password: '12345678', name: '', secondName: '', role: 'USER'}}
                validate={validate}
                onSubmit={(values, { setSubmitting, resetForm}) => {
                    registration(values, setSubmitting, resetForm)
                }}
            >
                {({ isSubmitting, isValid, errors, touched }) => {
                    return (
                        <Form>
                            <div className={styles.inputWrapper}>
                                <Field type="email" name="email"
                                       className={`${styles.loginFormInput} 
                            ${validateErrors || error ? styles.invalidInput : null}
                            ${isSubmitting ? styles.disabledInput : null}`
                                       }
                                       placeholder='Почта'/>
                                {errors.email && touched.email && <div className={styles.fieldError}>{errors.email}</div>}
                            </div>


                            <div className={styles.inputWrapper}>
                                <Field type="password" name="password"
                                       className={`${styles.loginFormInput} 
                        ${validateErrors || error ? styles.invalidInput : null}
                        ${isSubmitting ? styles.disabledInput : null}`
                                       }
                                        placeholder='Пароль'
                                        />
                                {errors.password && <div className={styles.fieldError}>{errors.password}</div>}
                            </div>

                            <div className={styles.inputWrapper}>
                                <Field type="text" name="name"
                                       className={`${styles.loginFormInput} 
                            ${validateErrors || error ? styles.invalidInput : null}
                            ${isSubmitting ? styles.disabledInput : null}`
                                       }
                                       placeholder='Имя'/>
                                {errors.name && touched.name && <div className={styles.fieldError}>{errors.name}</div>}
                            </div>

                            <div className={styles.inputWrapper}>
                                <Field type="text" name="secondName"
                                       className={`${styles.loginFormInput} 
                            ${validateErrors || error ? styles.invalidInput : null}
                            ${isSubmitting ? styles.disabledInput : null}`
                                       }
                                       placeholder='Фамилия'/>
                                {errors.secondName && touched.secondName && <div className={styles.fieldError}>{errors.secondName}</div>}
                            </div>

                            <div className={styles.inputWrapper}>
                                <Field as="select" name="role"
                                       className={`${styles.loginFormInput} 
                            ${validateErrors || error ? styles.invalidInput : null}
                            ${isSubmitting ? styles.disabledInput : null}`
                                       }>
                                    <option defaultChecked value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </Field>
                                {errors.secondName && touched.secondName && <div className={styles.fieldError}>{errors.secondName}</div>}
                                {error && <div className={styles.fieldError}>{error}</div>}
                            </div>

                            <button type="submit" disabled={!isValid || isSubmitting} className={isValid
                                ? isSubmitting ?`${styles.submitButton} ${styles.loading}` : styles.submitButton
                                : `${styles.disabledButton}`}>
                                Создать пользователя
                            </button>

                        </Form>
                    )}}
            </Formik>
        </div>
    );
}
