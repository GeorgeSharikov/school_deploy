import React from 'react';
import {NavLink} from "react-router-dom";
import styles from './styles.module.css'
import Avatar from "@mui/material/Avatar";
import {stringToHslColor} from "../../helpers/generateRandomColor.js";

export const ArticleAvatar = ({author, authorId, sizeW = 22, sizeH = 22}) => {
    return (
        <NavLink to={`/profile/${authorId}`} className={`${styles.headerItem} ${styles.author}`}>
            <Avatar variant="rounded" className={styles.avatar} style={{width: sizeW, height: sizeH}} sx={{backgroundColor: `${stringToHslColor(author, 50, 50)}`}}>
                {author[0].toUpperCase()}
            </Avatar>
            <div>{author}</div>
        </NavLink>
    );
}
