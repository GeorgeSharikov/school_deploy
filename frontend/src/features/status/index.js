import styles from './ui.module.css'
import React, {useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import ExpandingTextarea from "react-expanding-textarea";
import {UserApi} from "../../shared/api/api.js";
import {NotificationManager} from "react-notifications";
import {useActions} from "../../shared/hooks/useActions.jsx";
import {personalDataActions} from "../../store/userPersonalData/slice.js";

export const ProfileStatus = ({status, isMyOwn}) => {
    const {changePersonalStatus} = useActions(personalDataActions)

    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState(status)
    const [statusText, setStatusText] = useState(status)

    const changeStatus = async () => {
        try{
            const {statusData} = await UserApi.changeStatus(value)
            setValue(statusData)
            setStatusText(statusData)
            changePersonalStatus(value)
            setIsOpen(false)
        }catch (e) {
            NotificationManager.error('Ошибка', '', 2000)
        }
    }

    useEffect(() => {
        setValue(status)
        setStatusText(status)
    }, [status])

    const handleClose = () => {
        setIsOpen(false)
        console.log(status)
        setValue(status)
    }

    return(
        <div className={styles.status}>
            <div className={styles.text}>{statusText}</div>
            {isMyOwn && <div className={styles.changeStatus} onClick={() => setIsOpen(true)}>Изменить статус</div>}
            <Dialog open={isOpen} onClose={handleClose} >
                <DialogTitle>Изменить статус</DialogTitle>
                <DialogContent>
                    <ExpandingTextarea
                        autoFocus
                        placeholder="Статус"
                        maxLength="120"
                        className={styles.inputTitle}
                        style={{minHeight: 20, overflowY: 'hidden'}}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button onClick={changeStatus}>Изменить</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}