import {BlockOfArticle} from "../../entities/BlockOfArticle/index.jsx";
import React from "react";
import {useActions} from "../../shared/hooks/useActions.jsx";
import {draftsActions, draftsSelectors, getDraftsById, getDraftsTotalCount} from "./model/slice.js";
import {useParams} from "react-router-dom";
import {getFeedArticlesById, getProfileArticlesTotalCount} from "../profileArticleFeed/model/slice.js";

export const ProfileDraftsFeed = () => {
    const {setDrafts} = useActions(draftsActions)
    const {id} = useParams()
    document.title = `Черновики`
    return(
        <BlockOfArticle
                        getArticles={(page) => getDraftsById({page, id})}
                        amount={5}
                        getTotalCount={() => getDraftsTotalCount()}
                        showDelOpt={true}
                        showEditOpt={true}
                        showOpt={true}
                        setter={setDrafts}
                        selectors={draftsSelectors}
                        isDraft={true}
        />
    )
}