import { Modal } from "@mui/material"
import { Box } from "@mui/system"
import { ArticleEditor } from ".."
import { PortalHoc } from "../../../shared/helpers/PortalHoc"
import { modalEditorStyles } from "./ui/ui"
import {EditorForEditArticle} from "../EditorForArticleEdit/index.jsx";
import {EditorForArticleEditAdmin} from "../EditorForArticleEditAdmin/index.js";
import {setActiveBlocks} from "../../../shared/helpers/showInFeedEditorBlockTune/showInFeedEditorBlockTune.js";
import {settings} from "../../../constants/editorJsSetteng.js";
import React, {useEffect, useMemo, useRef, useState} from "react";
import EditorJS from "@editorjs/editorjs";
import {ArticleApi} from "../../../shared/api/api.js";
import {NotificationManager} from "react-notifications";
import {useOnClickOutside} from "../../../shared/hooks/useClickOutside.jsx";
import styles from "../ui/styles.module.css";
import {SmallAvatar} from "../../../shared/assets/avatar/smallAvatar.jsx";
import Textarea from "react-expanding-textarea";
import CloseIcon from "@mui/icons-material/Close.js";
import './../ui/styles.css'

export const ArticleEditorModal = ({isVisible, handleClose}) => {
    return (
        <PortalHoc elementPlace={document.body}>
            <Modal
                 open={isVisible}
                 onClose={handleClose}
                 >
                     <Box className={styles.editorModal}> 
                        <ArticleEditor close={handleClose} />
                     </Box>  
            </Modal>  
        </PortalHoc> 
    )
}

export const EditArticleEditorModal = ({isVisible, handleClose, articleData}) => {
    return (
        <PortalHoc elementPlace={document.body}>
            <Modal
                open={isVisible}
                onClose={handleClose}
            >
                <Box className={styles.editorModal}>
                    <EditorForEditArticle close={handleClose} articleData={articleData}/>
                </Box>
            </Modal>
        </PortalHoc>
    )
}

export const EditArticleEditorModalAdmin = ({isVisible, handleClose, articleData}) => {
    return (
        <PortalHoc elementPlace={document.body}>
            <Modal
                open={isVisible}
                onClose={handleClose}
            >
                <Box className={styles.editorModal}>
                    <EditorForArticleEditAdmin close={handleClose} articleData={articleData}/>
                </Box>
            </Modal>
        </PortalHoc>
    )
}


const AdminPanelEdit = ({close, articleData, callback}) => {
    let {showBlocksId, title, id: articleId, jsonData} = articleData
    showBlocksId = showBlocksId.filter(el => el !== '')
    setActiveBlocks(showBlocksId)
    console.log(showBlocksId)
    const {holder,placeholder,tools,tunes,i18n,logLevel,onChange} = settings
    const editor = useMemo(() => new EditorJS({
        holder,placeholder,tools,tunes,i18n,logLevel,onChange,
        data: jsonData
    }), [])

    const inputRef = useRef()
    const editorRef = useRef()

    const save = async () => {
        try{
            const data = await editor.save()
            const title = document.getElementById('titleArea').value
            setActiveBlocks([])
            const article = {data, title}
            console.log(article)
            await ArticleApi.update({article, isModerated: true, isDraft: false, articleId})
            NotificationManager.success('Статья опубликована.', '', 2000)
            close()
        }catch (e) {
            NotificationManager.error('Статья не опубликована.', '', 2000)
            console.log('Saving failed: ', e)
        }
    }

    const [isDisable, setIsDisable] = useState(false)
    const handleChange = (event) => {
        let tmp = event.target.value.split("").filter(el => el!=='')
        tmp = tmp.join("")
        if(!!tmp){
            setIsDisable(false)
        }else if(!!tmp === false && !isDisable){
            setIsDisable(true)
        }
    }

    const onTitleChange = (event) => {
        if(event.keyCode === 13){
            event.preventDefault()
            editor.focus()
        }
    }
    useEffect(() => {
        inputRef.current.focus()
        setTimeout(() => {
            if(editorRef.current.children[0]) {
                editorRef.current.removeChild(editorRef.current.children[0])
            }
        }, 0)
        return () => {
            setActiveBlocks([])
            editor?.destroy()
        }
        // eslint-disable-next-line
    }, [])


    return (
        <div className={styles.editorContainer} >
            <div className={`${styles.Ieditor} ${styles.editorBottom}`}>
                <div className={styles.bottomContent}>
                    <button onClick={save} className={styles.publishButton} style={isDisable ? {pointerEvents: 'none', opacity: .5} : null}>
                        <span className={styles.buttonLabel}>Сохранить</span>
                    </button>
                </div>
            </div>
            <div className={`${styles.Ieditor} ${styles.editorAuthors}`}>
                <div className={styles.authorSelect}>
                    <span className={styles.selectImg}>
                        <SmallAvatar />
                    </span>
                    <span className={styles.authorName}>
                        Мой блог
                    </span>
                </div>
            </div>
            <div className={styles.editorContent}>
                <div className={styles.Ieditor}>
                    <Textarea rows="1"
                              onKeyDown={onTitleChange}
                              onChange={handleChange}
                              id={'titleArea'}
                              ref={inputRef}
                              placeholder="Заголовок"
                              maxLength="120"
                              className={styles.inputTitle}
                              style={{minHeight: 47, overflowY: 'hidden'}}
                              defaultValue={title}
                    />
                </div>
                <div ref={editorRef} id={'editorjs'} className={`${styles.editorJS}`}/>
            </div>
            <div className={styles.closeButton} onClick={close}>
                <CloseIcon sx={{fontSize: 26}}/>
            </div>

        </div>

    );
}

export const EditArticleEditorAdminPanel = ({isVisible, handleClose, articleData, callback}) => {
    return (
        <PortalHoc elementPlace={document.body}>
            <Modal
                open={isVisible}
                onClose={handleClose}
            >
                <Box className={styles.editorModal}>
                    <AdminPanelEdit close={handleClose} articleData={articleData} callback={callback}/>
                </Box>
            </Modal>
        </PortalHoc>
    )
}