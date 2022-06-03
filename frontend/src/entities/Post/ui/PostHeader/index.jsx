import styles from './styles.module.css'
import {NavLink} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import {ArticleAvatar} from "../../../../shared/assets/articleAvatar/index.jsx";
import {ArticleDate} from "../../../../shared/assets/articleDate/index.jsx";
import {PostActions} from "../../../../features/postActions/index.jsx";

export const PostHeader = ({author,date, authorId, showActions, showEditAction, showDelAction, articleId, adminOptions}) => {
    // toHumanDateFormat(date)
    return (
        <div className={styles.header}>
            <div className={styles.info}>
                <ArticleAvatar author={author} authorId={authorId}/>
                {/*<ArticleDate date={date}/>*/}
            </div>
            {showActions && <PostActions showDelAction={showDelAction} showEditAction={showEditAction} articleId={articleId} adminOptions={adminOptions}/>}
        </div>
    );
}
