import React from 'react';
import {BlockOfArticle} from "../../entities/BlockOfArticle/index.jsx";
import {
    adminModerationActions,
    adminModerationSelectors,
    getAdminModerationArticles,
    getAdminModerationTotalCount
} from "./model/slice.js";
import {useActions} from "../../shared/hooks/useActions.jsx";
import styles from './styles.module.css'

export const AdminModerationFeed = (props) => {
    const {setAdminModeration} = useActions(adminModerationActions)
    document.title = `Админ панель - Модерация`
    return (
        <div className={styles.wrapper}>
            <BlockOfArticle
                getArticles={(page) => getAdminModerationArticles(page)}
                amount={5}
                getTotalCount={() => getAdminModerationTotalCount()}
                showDelOpt={false}
                showEditOpt={true}
                showOpt={true}
                adminOptions={true}
                isDraft={true}
                setter={setAdminModeration}
                selectors={adminModerationSelectors}
            />
        </div>
    );
}
