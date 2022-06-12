import { Box, Modal } from "@mui/material"
import styles from './ui/ui.module.css'
import { modalStyles } from "./ui/ui"
import { LoginForm } from "./loginForm/loginForm"
import CloseIcon from "@mui/icons-material/Close.js";

export const LoginModal = ({isModalVisible, closeHandler, setModalVisible}) => {
    return <Modal
        open={isModalVisible}
        onClose={closeHandler}
    >
        <Box className={styles.modal}>
            <div className={styles.formContainer}>
                <div className={styles.formTitle}>Вход в аккаунт</div>
                <LoginForm setModalVisible={setModalVisible}/>
                <div className={styles.closeButton} onClick={closeHandler}>
                    <CloseIcon sx={{fontSize: 26}}/>
                </div>
            </div>
        </Box>
    </Modal>
}