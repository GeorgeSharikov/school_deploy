import styles from '.././ui/styles.module.css'
import EditorJS from "@editorjs/editorjs";
import {settings} from "../../../constants/editorJsSetteng.js";
import {useEffect, useMemo, useRef, useState} from "react";
import Textarea from 'react-expanding-textarea'
import { SmallAvatar } from '../../../shared/assets/avatar/smallAvatar';
import {
    setActiveBlocks
} from "../../../shared/helpers/showInFeedEditorBlockTune/showInFeedEditorBlockTune.js";
import {NotificationManager} from 'react-notifications';
import {useOnClickOutside} from "../../../shared/hooks/useClickOutside.jsx";
import {ArticleApi} from "../../../shared/api/api.js";
import CloseIcon from '@mui/icons-material/Close';
import {useSelector} from "react-redux";
import {userAuthSelectors} from "../../../store/userAuthSlice/slice.js";

export const EditorForEditArticle = ({close, articleData}) => {
    let {showBlocksId, title, id: articleId, jsonData} = articleData
    showBlocksId = showBlocksId.filter(el => el !== '')
    setActiveBlocks(showBlocksId)
    const {holder,placeholder,tools,tunes,i18n,logLevel,onChange} = settings
    const editor = useMemo(() => new EditorJS({
        holder,placeholder,tools,tunes,i18n,logLevel,onChange,
        data: jsonData
    }), [])

    const inputRef = useRef()
    const editorRef = useRef()

    const isAdmin = useSelector((state) => userAuthSelectors.getIsUserAdmin(state))

    const save = async () => {
        try{
            const data = await editor.save()
            const title = document.getElementById('titleArea').value
            setActiveBlocks([])
            const article = {data, title}
            console.log(article)
            await ArticleApi.update({article, isModerated: isAdmin, isDraft: false, articleId})
            if(isAdmin){
                NotificationManager.success('Статья опубликована.', '', 2000)
            }else{
                NotificationManager.success('Отправлена на проверку.', '', 2000)
            }
            close()
        }catch (e) {
            NotificationManager.error('Статья не отправлена.', '', 2000)
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

    const handleClose = async () => {
        try{
            const data = await editor.save()
            const title = document.getElementById('titleArea').value
            setActiveBlocks([])
            const article = {data, title}
            console.log(article)
            await ArticleApi.update({article, isModerated: false, isDraft: true, articleId})
            NotificationManager.success('Статья сохранена.', '',2000)
            close()
        }catch (e) {
            NotificationManager.error('Статья не сохранена.', '', 2000)
        }

    }

    const clickRef = useRef()
    useOnClickOutside(clickRef, handleClose)

    return (
        <div className={styles.editorContainer} ref={clickRef}>
            <div className={`${styles.Ieditor} ${styles.editorBottom}`}>
                <div className={styles.bottomContent}>
                    <button onClick={save} className={styles.publishButton} style={isDisable ? {pointerEvents: 'none', opacity: .5} : null}>
                        <span className={styles.buttonLabel}>Опубликовать</span>
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
