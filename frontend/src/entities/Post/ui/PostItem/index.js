import { NavLink } from "react-router-dom"
import { AddToBookMarks } from "../../../../features/addToBookmarks"
import { Like } from "../../../../features/likes"
import { PostContent } from "../PostContent"
import { PostHeader } from "../PostHeader"
import styles from './ui.module.css'

export const PostItem = ({post, authUserId, showActions = false, showDelAction=false, showEditAction=false, isDraft=false, adminOptions=false}) => {
    const {id:articleId, title, title_paragraph, title_image: secondTitleBlock, like_count: likesCount, userId: authorId, first_name, last_name, createdAt, likes, dislikes} = post
    const author = `${first_name} ${last_name}`
    return(
        <div className={styles.post}>
            <PostHeader adminOptions={adminOptions} articleId={articleId} author={author} date={createdAt} authorId={authorId} showActions={showActions} showDelAction={showDelAction} showEditAction={showEditAction}/>
            <NavLink to={`/articles/${articleId}`}>
                <PostContent title={title} titleParagraph={title_paragraph} secondTitleBlock={secondTitleBlock}/>
            </NavLink>
             <div className={styles.footer}>
                 {!isDraft &&<div className={styles.footerItem}>
                    <AddToBookMarks articleId={articleId} authUserId={authUserId}/>
                </div>}
                 {!isDraft &&<div>
                    <Like likesCount={likesCount} likes={likes} dislikes={dislikes} articleId={articleId}
                          authUserId={authUserId}/>
                </div>}
            </div>
        </div>
    )
}