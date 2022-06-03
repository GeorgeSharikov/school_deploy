import styles from './styles.module.css'
import {BlockOfArticle} from "../../entities/BlockOfArticle/index.jsx";
import {
    articleActions,
    articleSelectors,
    getArticlesTotalCount,
    getFeedArticles
} from "../../features/showArticles/model/slice.js";
import React from "react";
import {useActions} from "../../shared/hooks/useActions.jsx";

export const ArticlesFeed = () => {
    const {setFeedArticles} = useActions(articleActions)
    return (
        <div className={styles.wrapper}>
                <BlockOfArticle getArticles={(page) => getFeedArticles(page)}
                                amount={5}
                                getTotalCount={() => getArticlesTotalCount({isModerated: true, id: null})}
                                showDelOpt={false}
                                showOpt={false}
                                showEditOpt={false}
                                setter={(arr) => setFeedArticles(arr)}
                                selectors={articleSelectors}
                />
        </div>
    )
}