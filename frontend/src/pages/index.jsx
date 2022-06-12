import {Routes, Route} from "react-router-dom";
import {SideBar} from "../widgets/Sidebar";
import styles from './main.module.css'
import {useSelector} from "react-redux";
import {sideBarSelectors, toggleActions} from "../features/sidebarToggle/model/slice.js";
import {ArticlesFeed} from "./ArticlesFeed";
import { Profile } from "./Profile";
import { ProfileArticleFeed } from "./profileArticleFeed";
import { ProfileDraftsFeed } from "./profileDraftsFeed";
import {FullArticle} from "./FullArticle/index.js";
import {PageNotFound} from "./PageNotFound/index.js";
import {useActions} from "../shared/hooks/useActions.jsx";
import {useEffect} from "react";
import {Bookmarks} from "./Bookmarks/index.js";
import {userAuthSelectors} from "../store/userAuthSlice/slice.js";
import {AdminModerationFeed} from "./AdminModerationFeed/index.js";
import {AdminPanel} from "./AdminPanel/index.js";
import {CreationUser} from "./AdminPanel/CreationUser/index.js";
import {About} from "./About/index.js";
import {UserList} from "./AdminPanel/UsersList/index.js";
import {ArticleList} from "./AdminPanel/ArticlesList/index.jsx";
import {UserSetting} from "./UserSettings/UserSetting.js";

export const Routing = () => {
    const isSidebarActive = useSelector(sideBarSelectors.getSidebarIsActive)
    const {setActive} = useActions(toggleActions)
    const isAuth = useSelector(state => userAuthSelectors.getIsUserAuth(state))
    const role = useSelector(state => userAuthSelectors.getUserRole(state))

    useEffect(() => {
        if(window.innerWidth < 859 && isSidebarActive){
            setActive()
        }
    }, [])
    return (
        <div className={styles.main}>
            {isSidebarActive && <SideBar />}
            <div className={styles.content}>
                    <Routes>
                        <Route path={'/'} element={<ArticlesFeed />}/>
                        <Route path={'/articles/:id'} element={<FullArticle />}/>
                        <Route path={'/profile/:id'} element={<Profile/>}>
                            <Route path="" element={<ProfileArticleFeed />} />
                            <Route path="drafts" element={<ProfileDraftsFeed />} />
                        </Route>
                        <Route path={'/profile/:id/settings'} element={<UserSetting />}/>
                        <Route path={'/about'} element={<About />}/>
                        {isAuth && <Route path={"/bookmarks"} element={<Bookmarks/>}/>}

                        {role === 'ADMIN' && <Route path={"/moderation"} element={<AdminModerationFeed />}/>}
                        {role === 'ADMIN' &&
                        <Route path={"/admin-panel"} element={<AdminPanel />}>
                            <Route path="registration" element={<CreationUser />} />
                            <Route path="users-list" element={<UserList />} />
                            <Route path="articles-list" element={<ArticleList />} />
                        </Route>}

                        <Route path={"/error-page-not-found"} element={<PageNotFound/>}/>
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
            </div>
            <div className={styles.rightPart}></div>
        </div>
    )
}   