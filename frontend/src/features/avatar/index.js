import styles from './ui.module.css'
import Avatar from "@mui/material/Avatar";
import {stringToHslColor} from "../../shared/helpers/generateRandomColor.js";

export const ProfileAvatar = ({name}) => {
    return(
        <Avatar className={styles.headerAvatar} variant="rounded" sx={{width: 112, height: 112, backgroundColor: `${stringToHslColor(name, 50, 50)}`}}>
            <div style={{fontSize: 60}}>{name[0].toUpperCase()}</div>
        </Avatar>
    )
}