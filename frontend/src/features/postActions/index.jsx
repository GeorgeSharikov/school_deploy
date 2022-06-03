import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from './ui/styles.module.css'
import {useRef, useState} from "react";
import {useOnClickOutside} from "../../shared/hooks/useClickOutside.jsx";
import {ArticleApi} from "../../shared/api/api.js";
import {EditArticleEditorModal, EditArticleEditorModalAdmin} from "../createArticle/ModalArticleEditor/index.jsx";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {NotificationManager} from "react-notifications";

export const PostActions = ({showEditAction, showDelAction, articleId, adminOptions}) => {
    const [isEditorOpen, setIsEditorOpen] = useState(false)
    const [isAdminEditorOpen, setIsAdminEditorOpen] = useState(false)

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false)
    const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false)



    const [editorProps, setEditorProps] = useState({})
    const [isOpen, setIsOpen] = useState(false)

    const ref = useRef();
    useOnClickOutside(ref, () => setIsOpen(false))

    const getArticleForEditor = async () => {
        try {
            let {show_blocks_id: showBlocksId, title, id, json_article_data: jsonData} = await ArticleApi.getArticleForEditor(articleId)
            showBlocksId = showBlocksId.split(" ")
            jsonData = JSON.parse(jsonData)
            console.log(jsonData)
            setEditorProps({showBlocksId, title, id, jsonData})
            if(adminOptions){
                setIsAdminEditorOpen(true)
            }else{
                setIsEditorOpen(true)
            }
        }catch (e) {
            console.log(e)
        }
    }

    const deleteArticle = async () => {
        try {
            await ArticleApi.delete(articleId)
            setIsDeleteDialogOpen(false)
            NotificationManager.success('Статья удалена.', '', 2000)
        }catch (e) {
            console.log(e)
            NotificationManager.error('Статья не удалена.', '', 2000)
            setIsDeleteDialogOpen(false)
        }
    }

    const publish = async () => {
        try{
            await ArticleApi.publish(articleId)
            NotificationManager.success('Статья опубликована.', '', 2000)
            setIsPublishDialogOpen(false)
        }catch (e) {
            NotificationManager.error('Статья не опубликована..', '', 2000)
            console.log('Saving failed: ', e)
        }
    }

    const decline = async () => {
        try{
            await ArticleApi.decline(articleId)
            NotificationManager.success('Статья отменена.', '', 2000)
            setIsDeclineDialogOpen(false)
        }catch (e) {
            NotificationManager.error('Статья не отменена.', '', 2000)
            console.log('Saving failed: ', e)
        }
    }

    return (
        <div>
            <MoreVertIcon className={styles.actions} onClick={() => setIsOpen(true)}/>
            {isOpen && <div className={styles.actionsContainer} ref={ref}>
                    <div className={styles.actionContent}>
                        {showDelAction && <div className={styles.actionItem} onClick={() => setIsDeleteDialogOpen(true)}>Удалить</div>}
                        {showEditAction && <div className={styles.actionItem} onClick={getArticleForEditor}>Редакитровать</div>}
                        {adminOptions && <div className={styles.actionItem} onClick={() => setIsPublishDialogOpen(true)}>Опубликовать</div>}
                        {adminOptions && <div className={styles.actionItem} onClick={() => setIsDeclineDialogOpen(true)}>Отменить</div>}
                    </div>
            </div>}
            {isEditorOpen && <EditArticleEditorModal isVisible={isEditorOpen} handleClose={() => setIsEditorOpen(false)} articleData={editorProps}/>}
            {isAdminEditorOpen && <EditArticleEditorModalAdmin isVisible={isAdminEditorOpen} handleClose={() => setIsAdminEditorOpen(false)} articleData={editorProps}/>}

            <Dialog
                open={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Удалить"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {'Вы желаете удалить статью?'}
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={() => setIsDeleteDialogOpen(false)}>Отмена</Button>
                        <Button onClick={deleteArticle} autoFocus>
                            Удалить
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>

            <Dialog
                open={isPublishDialogOpen}
                onClose={() => setIsPublishDialogOpen(false)}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Опубликовать"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {'Вы хотите спубликовать статью?'}
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={() => setIsPublishDialogOpen(false)}>Отмена</Button>
                        <Button onClick={publish} autoFocus>
                            Опубликовать
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>

            <Dialog
                open={isDeclineDialogOpen}
                onClose={() => setIsDeclineDialogOpen(false)}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Отправить статью назад"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {'Вы хотите спубликовать статью?'}
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={() => setIsDeclineDialogOpen(false)}>Отмена</Button>
                        <Button onClick={decline} autoFocus>
                            Отправить
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}
