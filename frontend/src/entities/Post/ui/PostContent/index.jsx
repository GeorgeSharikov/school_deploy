import styles from './styles.module.css'
import "./styles.css"

export const PostContent = ({title, titleParagraph, secondTitleBlock}) => {
    const setHtml = (html) => {
        return {__html: html}
    }
    return (
        <div className={'content-short'}>
            <div className={styles.title}>
                {title}
            </div>
            <div dangerouslySetInnerHTML={setHtml(titleParagraph)}/>
            <div dangerouslySetInnerHTML={setHtml(secondTitleBlock)}/>
        </div>
    )
}