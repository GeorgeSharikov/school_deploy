import { Formik, Form, Field} from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthActions, userLogIn } from '../../../store/userAuthSlice/slice';
import { userAuthSelectors } from '../../../store/userAuthSlice/slice';
import {useActions} from '../../../shared/hooks/useActions'
import styles from './ui.module.css'
import {getPersonalData, personalDataActions} from '../../../store/userPersonalData/slice';
import {articleActions, getArticlesTotalCount, getBookmarks, getFeedArticles} from "../../showArticles/model/slice.js";
import {articlesProfileActions} from "../../../pages/profileArticleFeed/model/slice.js";
import {BookmarksActions} from "../../../pages/Bookmarks/model/slice.js";
import {draftsActions} from "../../../pages/profileDraftsFeed/model/slice.js";
import {useLocation, useNavigate} from "react-router-dom";
import {adminModerationActions} from "../../../pages/AdminModerationFeed/model/slice.js";

export const LoginForm = ({setModalVisible}) => {
    const dispatch = useDispatch()
    const {setFeedArticles} = useActions(articleActions)
    const {setLoginError} = useActions(userAuthActions)
    const loginErrors = useSelector(state => userAuthSelectors.getIsLoginError(state))
    const [error, setError] = useState(loginErrors)
    const [validateErrors, setValidateErrors] = useState(false)

    const navigate = useNavigate()

    const {logOut} = useActions(userAuthActions)
    const {setEmptyPersonalData} = useActions(personalDataActions)
    const {setEmpty} = useActions(articleActions)
    const {setProfileArticles} = useActions(articlesProfileActions)
    const {setBookmarks} = useActions(BookmarksActions)
    const {setDrafts} = useActions(draftsActions)
    const {setAdminModeration} = useActions(adminModerationActions)

    const validate = (values) => {
        const errors = {};
        
        if (!values.email) {
          errors.email = 'Почта обязательна';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Некорректная почта';
        }
        if("email" in errors && !validateErrors){
            setValidateErrors(true)
        }
        if(!("email" in errors) && validateErrors){
            setValidateErrors(false)
        }
        return errors;
      };

    const logIn = async (data, callbackSubmit) => {
            setEmptyPersonalData()
            logOut()
            setEmpty()
            setProfileArticles()
            setBookmarks()
            setDrafts()
            setAdminModeration()
            dispatch(userLogIn(data))
                .then((res) => {
                    navigate("/", { replace: true })
                    setFeedArticles([])
                    dispatch(getArticlesTotalCount({isModerated: true, id: null}))
                    if(!('error' in res)){
                        setModalVisible(false)
                    }
                    callbackSubmit(false)
                    dispatch(getPersonalData())
                    dispatch(getBookmarks())
                })
    }

    useEffect(() => {
        setError(loginErrors)
    }, [loginErrors])

    useEffect(() => () => {
            setLoginError(false)
            setValidateErrors(false)
    }, [setLoginError])
    return (
        <div>
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={validate} 
            onSubmit={(values, { setSubmitting }) => {
                logIn(values, setSubmitting)
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
                    placeholder='Пароль'/>
                    {error && <div className={styles.fieldError}>{error}</div>}
            </div>

            
            <button type="submit" disabled={!isValid || isSubmitting} className={isValid 
            ? isSubmitting ?`${styles.submitButton} ${styles.loading}` : styles.submitButton
            : `${styles.disabledButton}`}>
                Вход
            </button>
            
        </Form>
        )}}
        </Formik>
    </div>
    )
}