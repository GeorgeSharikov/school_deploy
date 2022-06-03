import { configureStore } from "@reduxjs/toolkit";
import {sideBarToggleSlice} from "../features/sidebarToggle/model/slice.js";
import { userAuthSlice } from "./userAuthSlice/slice.js";
import { personalDataSlice } from "./userPersonalData/slice.js";
import {articleSlice} from "../features/showArticles/model/slice.js";
import {articleInfoSlice} from "../features/getArticle/slice.js";
import {articlesProfileSlice} from "../pages/profileArticleFeed/model/slice.js";
import {BookmarksSlice} from "../pages/Bookmarks/model/slice.js";
import {draftsSlice} from "../pages/profileDraftsFeed/model/slice.js";
import {adminModerationSlice} from "../pages/AdminModerationFeed/model/slice.js";

export const store = configureStore({
    reducer: {
        sideBarToggle: sideBarToggleSlice,
        userAuth: userAuthSlice,
        personalData: personalDataSlice,
        article: articleSlice,
        getArticle: articleInfoSlice,
        profileArticles: articlesProfileSlice,
        bookmarks: BookmarksSlice,
        drafts: draftsSlice,
        adminModeration: adminModerationSlice
    },
    devTools: true
})