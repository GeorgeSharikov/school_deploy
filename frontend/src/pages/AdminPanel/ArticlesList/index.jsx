import React, {useEffect, useState} from 'react';
import {ArticleApi} from "../../../shared/api/api.js";
import styles from './styles.module.css'
import {NavLink} from "react-router-dom";
import {NotificationManager} from "react-notifications";
import {
    EditArticleEditorAdminPanel,
    EditArticleEditorModalAdmin
} from "../../../features/createArticle/ModalArticleEditor/index.jsx";

export const ArticleList = (props) => {
    const [articles, setArticles] = useState([])

    const [isVisible, setIsVisible] = useState(false)
    const [editorProps, setEditorProps] = useState({})

    useEffect(() => {
        ArticleApi.getAllArticles()
            .then((res) => {
                setArticles(res)
            })
            .catch((e) => {
            })
    }, [])

    const deleteArticle = async (id) => {
        try{
            await ArticleApi.deleteArticleByAdmin(id)
            await ArticleApi.getAllArticles()
                .then((res) => {
                    setArticles(res)
                })
                .catch((e) => {
                })
            NotificationManager.success('Статья удалена', '', 2000)
        }catch (e) {
            NotificationManager.error('Ошибка', '', 2000)
        }
        await ArticleApi.deleteArticleByAdmin(id)
    }

    const handleEdit = async (articleId) => {
        try {
            let {show_blocks_id: showBlocksId, title, id, json_article_data: jsonData} = await ArticleApi.getArticleForEditor(articleId)
            showBlocksId = showBlocksId.split(" ")
            jsonData = JSON.parse(jsonData)
            console.log(jsonData)
            setEditorProps({showBlocksId, title, id, jsonData})
            setIsVisible(true)
        }catch (e) {
            console.log(e)
        }
    }

    document.title = `Админ панель - Список статей`
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.item} style={{ backgroundColor: '#DCDCDC'}}>Автор статьи</div>
                <div className={`${styles.item} ${styles.title}`} style={{justifyContent: 'center',  backgroundColor: '#DCDCDC'}}>Заголовок</div>
            </div>
            {articles.map(({title, first_name, last_name, createdAt, id}, index) => {
                const author = `${first_name} ${last_name}`
                return <div className={styles.article} key={id}>
                    <NavLink to={`/articles/${id}`}>
                        <div className={styles.itemWrapper}>
                            <div className={styles.item} style={{width: '50px'}}>{index+1}</div>
                            <div className={styles.articleInfo}>
                                <div className={styles.item}>{author}</div>
                                <div className={`${styles.item} ${styles.title}`}>{title}</div>
                            </div>
                        </div>
                    </NavLink>
                    <div className={styles.articleTools}>
                        <div className={`${styles.btn} ${styles.del}`} onClick={() => deleteArticle(id)}>Удалить</div>
                        <div className={`${styles.btn} ${styles.edit}`} onClick={() => handleEdit(id)}>Редактировать</div>
                    </div>
                </div>
            })}
            <EditArticleEditorAdminPanel isVisible={isVisible} handleClose={() => setIsVisible(false)} articleData={editorProps} callback={(data) => setEditorProps(data)} />
        </div>
    );
}
