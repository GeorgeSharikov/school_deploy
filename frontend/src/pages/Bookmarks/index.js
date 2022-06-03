import React from 'react';
import styles from './styles.module.css'
import {BlockOfArticle} from "../../entities/BlockOfArticle/index.jsx";
import {BookmarksActions, BookmarksSelectors, getBookmarksById, getBookmarksTotalCount} from "./model/slice.js";
import {useActions} from "../../shared/hooks/useActions.jsx";

export const Bookmarks = (props) => {
    const {setBookmarks} = useActions(BookmarksActions)
    return (
        <div className={styles.wrapper}>
            <BlockOfArticle
                getArticles={(page) => getBookmarksById(page)}
                getTotalCount={getBookmarksTotalCount}
                showDelOpt={false}
                showEditOpt={false}
                showOpt={false}
                setter={setBookmarks}
                selectors={BookmarksSelectors}
             />
        </div>
    );
}
