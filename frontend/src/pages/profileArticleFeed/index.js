import { useSelector} from "react-redux";
import {userAuthSelectors} from "../../store/userAuthSlice/slice.js";
import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {BlockOfArticle} from "../../entities/BlockOfArticle/index.jsx";
import {
    articlesProfileActions,
    articlesProfileSelectors,
    getFeedArticlesById,
    getProfileArticlesTotalCount
} from "./model/slice.js";
import {useActions} from "../../shared/hooks/useActions.jsx";

export const ProfileArticleFeed = () => {
    const [isOwner, setIsOwner] = useState(false)
    const {setProfileArticles} = useActions(articlesProfileActions)

    let {id} = useParams()
    id = Number(id)
    const authUserId = useSelector(state => userAuthSelectors.getUserPersonalId(state))
    useEffect(() => {
        if(id === authUserId){
            setIsOwner(true)
        }
    }, [authUserId, id])

    return (
            <BlockOfArticle getArticles={(page) => getFeedArticlesById({page, id})}
                            amount={5}
                            getTotalCount={() => getProfileArticlesTotalCount({isModerated: true, id: id})}
                            showDelOpt={isOwner}
                            showEditOpt={false}
                            showOpt={isOwner}
                            setter={setProfileArticles}
                            selectors={articlesProfileSelectors}
            />
    );
}