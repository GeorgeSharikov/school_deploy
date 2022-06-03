import styles from './ui.module.css'

export const ProfileStatus = ({status}) => {
    status = 'LOL KEK '
    return(
        <div className={styles.status}>
            <div className={styles.text}>{status}</div>
        </div>
    )
}