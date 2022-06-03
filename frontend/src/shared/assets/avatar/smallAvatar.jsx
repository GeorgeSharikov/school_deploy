import { Avatar } from "@mui/material"
import { useSelector } from "react-redux"
import { getPeronalDataSelector } from "../../../store/userPersonalData/selectors"
import styles from './ui.module.css'
import {stringToHslColor} from "../../helpers/generateRandomColor.js";

export const SmallAvatar = () => {
    const {avatar, firstName, lastName} = useSelector(state => getPeronalDataSelector(state))
    const author = `${firstName} ${lastName}`
    const firstLetter = firstName?.split('')[0]
    return (
        !!!avatar 
        ? <div style={{backgroundImage: `url(${avatar})`}} className={styles.subImg}/>
        : <Avatar style={{width: '22px', height: '22px'}} className={styles.ava} sx={{backgroundColor: `${stringToHslColor(author, 50, 50)}`}}>{firstLetter}</Avatar>
    )
}