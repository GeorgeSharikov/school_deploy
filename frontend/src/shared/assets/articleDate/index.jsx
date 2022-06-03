import React from 'react';
import styles from "./styles.module.css";

export const ArticleDate = ({date}) => {
    return (
        <div className={styles.time}>
            <time>{date}</time>
        </div>
    );
}
