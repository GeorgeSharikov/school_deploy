import { Box, Modal } from "@mui/material"
import styles from './ui/ui.module.css'
import { modalStyles } from "./ui/ui"
import { LoginForm } from "./loginForm/loginForm"

export const LoginModal = ({isModalVisible, closeHandler, setModalVisible}) => {
    return <Modal
        open={isModalVisible}
        onClose={closeHandler}
    >
        <Box sx={modalStyles}>
            <div className={styles.formContainer}>
                <div className={styles.formTitle}>Вход в аккаунт</div>
                <LoginForm setModalVisible={setModalVisible}/>
            </div>
        </Box>
    </Modal>
}