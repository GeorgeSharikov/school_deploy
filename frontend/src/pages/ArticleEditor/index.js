import styles from './ui/styles.module.css'
import {ArticleEditor} from "../../features/createArticle";

export const ArticleEditorPage = (props) => {
    return (
            <div className={styles.container}>
                <div className={styles.editor}>
                    <ArticleEditor />
                </div>
            </div>
    );
}
