import React, {useEffect, useRef, useState} from 'react';
import {PostItem} from "../Post/ui/PostItem/index.js";
import Skeleton from "@mui/material/Skeleton";
import {useDispatch, useSelector} from "react-redux";
import {userAuthSelectors} from "../../store/userAuthSlice/slice.js";
import styles from './styles.module.css'

export const BlockOfArticle = React.memo(({adminOptions, getArticles, getTotalCount, amount=5, showOpt, showDelOpt, showEditOpt, setter, selectors, isDraft}) => {
    const dispatch = useDispatch()

    const authUserId = useSelector(state => userAuthSelectors.getUserPersonalId(state))
    const articlesFeed = useSelector(state => selectors.getArticles(state))
    const totalCount = useSelector(state => selectors.totalArticlesCount(state))
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [lastElement, setLastElement] = useState(null);


    const observer = useRef(
        new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting) {
                    setPage((no) => no + 1);
                }
            })
    );

    useEffect(() => {
        const currentElement = lastElement;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {

            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [lastElement]);

    useEffect(() => {
        dispatch(getTotalCount())
        return () => {
            setter([])
        }
    }, [dispatch])

    useEffect(() => {
        const maxPage = Math.ceil(totalCount/amount)
        setLoading(true)
        if(page <= maxPage || (totalCount < amount && totalCount !== 0)){
            dispatch(getArticles(page))
        }
        setLoading(false)
    }, [page, dispatch, totalCount])
    return (
        <div className={styles.wrapper}>
            {articlesFeed.length > 0 && articlesFeed.map((el, i) => {
                if(i === articlesFeed.length-1 && !loading && page*5 <= totalCount  ){
                    return <div key={el.id} ref={setLastElement}>
                        <PostItem adminOptions={adminOptions} post={el} authUserId={authUserId} isDraft={isDraft} showActions={showOpt} showDelAction={showDelOpt} showEditAction={showEditOpt}/>
                    </div>
                }
                return <PostItem adminOptions={adminOptions} post={el} key={el.id} authUserId={authUserId} isDraft={isDraft} showActions={showOpt} showDelAction={showDelOpt} showEditAction={showEditOpt}/>
            })}
            {loading && <div>
                <Skeleton variant="text" />
                <Skeleton variant="rectangular" width={640} height={700} />
            </div>}
            {!loading && articlesFeed.length === 0 && <div className={styles.emptyPage}>
                <div className={styles.emptyPageText}>Здесь еще нет статей.</div>
            </div>}
        </div>
    );
})
