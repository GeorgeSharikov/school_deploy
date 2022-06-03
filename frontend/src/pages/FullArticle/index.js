import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {articleInfoActions, articleInfoSelectors, getOneArticle} from "../../features/getArticle/slice.js";
import './ui/styles.css'
import {ArticleAvatar} from "../../shared/assets/articleAvatar/index.jsx";
import {ArticleDate} from "../../shared/assets/articleDate/index.jsx";
import {Navigate} from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import {useActions} from "../../shared/hooks/useActions.jsx";
import {Like} from "../../features/likes/index.js";
import {userAuthSelectors} from "../../store/userAuthSlice/slice.js";
import {AddToBookMarks} from "../../features/addToBookmarks/index.js";

export const FullArticle = (props) => {
    const {setErrorMessage, setArticleInformation} = useActions(articleInfoActions)

    const dispatch = useDispatch()

    const authUserId = useSelector(state => userAuthSelectors.getUserPersonalId(state))
    const {id} = useParams()
    const [isFetching, setIsFetching] = useState(true)
    const {content, userId, first_name: firstName, last_name: lastName, like_count: likeCount, createdAt, likes, dislikes, isDraft} = useSelector(state => articleInfoSelectors.getArticleInfo(state))
    const errorMessage = useSelector(state => articleInfoSelectors.getArticleError(state))

    useEffect(() => {
        dispatch(getOneArticle(id)).then(() => {
            setIsFetching(false)
        })
        return () => {
            setErrorMessage(null)
            setArticleInformation({})
        }
    }, [dispatch, id])
    if(errorMessage){
        return <Navigate to="/error-page-not-found" replace={true}/>
    }

    return (
        <div className={'full-article'}>
            <div className={'page-wrapper'}>
                <div className={'content_wrapper'}>
                    {isFetching
                        ? <div className={'page-mask I-island-a'}>
                            <Skeleton variant="text" height={40}/>
                            <Skeleton variant="text" height={120}/>
                            <Skeleton variant="rectangular" width={600} height={600} />
                        </div>
                        : <>
                            <div className={'content_header I-island-a'}>
                                <ArticleAvatar author={`${firstName} ${lastName}`} authorId={userId}/>
                                <ArticleDate date={createdAt}/>
                            </div>
                            <div dangerouslySetInnerHTML={{__html: content}}/>
                            <div className={'article-footer I-island-a'}>
                                <div className={'footer-tools'}>
                                    <ArticleAvatar author={`${firstName} ${lastName}`} authorId={userId} sizeH={40} sizeW={40}/>
                                    {!isDraft && <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Like likesCount={likeCount} likes={likes} dislikes={dislikes}
                                              authUserId={authUserId} articleId={id}/>
                                        <div style={{marginLeft: '20px'}}>
                                            <AddToBookMarks articleId={id} authUserId={authUserId}/>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}
