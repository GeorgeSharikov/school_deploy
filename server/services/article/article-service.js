import {JSONToHtml} from "../../core/helpers/covertJSONToHtml.js";
import {ArticleRepository} from "./article-repository.js";
import {ApiError} from "../../error/ApiError.js";

class ArticleServiceClass{
    async getFeed(page){
        try{
            const condition = {is_moderated: true}

            return await ArticleRepository.getFeedArticlesByPage(page, condition)
        }catch (e) {
            throw new Error(e)
        }
    }

    async getOne(articleId, next){
        return await ArticleRepository.getOne(articleId, next)
    }

    async getOneEditArticle(articleId, next){
        return await ArticleRepository.getOneEditArticle(articleId, next)
    }

    async create(articleData, userId, next){
        try{
            const {article, is_moderated, is_draft} = articleData
            const {title, data} = article
            const {articleHTML, title_paragraph, title_image, blocksToFeed} = JSONToHtml.convert(article)
            const result = await ArticleRepository.createOne(userId, {title, data, is_moderated, is_draft, articleHTML, title_paragraph, title_image, blocksToFeed}, next)
            return result
        }catch (e) {
            console.log('error ser', e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async update(articleData, next){
        try{
            const {article, is_moderated, is_draft, articleId} = articleData
            const {title, data} = article
            const {articleHTML, title_paragraph, title_image, blocksToFeed} = JSONToHtml.convert(article)
            const code = await ArticleRepository.update(articleId, {title, data, is_moderated, is_draft, articleHTML, title_paragraph, title_image, blocksToFeed}, next)
            return code
        }catch (e) {
            console.log('error ser', e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }
    async delete(userId, articleId, next){
        try{
            const condition = {id: articleId, userId: userId}
            const code = await ArticleRepository.delete(condition, next)
            return code
        }catch (e) {
            console.log('error ser', e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async deleteArticleByAdmin(articleId, next){
        try{
            const condition = {id: articleId}
            const code = await ArticleRepository.delete(condition, next)
            return code
        }catch (e) {
            console.log('error ser', e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async updateAndPublishDraft(articleData, articleId, next){
        try{
            const {article, is_moderated, is_draft} = articleData
            const {title, data} = article
            const {articleHTML, title_paragraph, title_image, blocksToFeed} = JSONToHtml.convert(article)
            const result = await ArticleRepository.createOne(userId, {title, data, is_moderated, is_draft, articleHTML, title_paragraph, title_image, blocksToFeed}, next)
            return result
        }catch (e) {
            console.log('error ser', e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async countArticles(conditions, next){
        const conditionalObj = {}
        if(conditions.isModerated){
            conditionalObj['is_moderated'] = Boolean(conditions.isModerated)
        }
        if(conditions.profileId){
            conditionalObj['userId'] = conditions.profileId
        }
        try{
            return await ArticleRepository.count(conditionalObj, next)
        }catch (e) {
            console.log('error ser', e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async like(articleId, userId, next){
        try{
            return await ArticleRepository.like(articleId, userId, next)
        }catch (e) {
            console.log('error ser', e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async dislike(articleId, userId, next){
        try{
            return await ArticleRepository.dislike(articleId, userId, next)
        }catch (e) {
            console.log('error ser', e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async addBookmark(articleId, userId, next){
        try{
            return await ArticleRepository.addBookmark(articleId, userId, next)
        }catch (e) {
            console.log('error ser', e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async getBookmarksTotalCount(userId, next){
        try{
            return await ArticleRepository.getBookmarksTotalCount(userId, next)
        }catch (e) {
            console.log('error ser', e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async getBookmarks(userId, next){
        try{
            return await ArticleRepository.getBookmarks(userId, next)
        }catch (e) {
            console.log('error ser', e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }
    async getFeedArticlesById(id, page, next){
        try{
            id = Number(id)
            const condition = {is_moderated: true, userId: id}
            return await ArticleRepository.getFeedArticlesByPage(page, condition)
        }catch (e) {
            console.log('error ser', e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async getDraftsArticlesById(id, page, next){
        try{
            id = Number(id)
            const condition = {is_moderated: false, userId: id, is_draft: true}

            return await ArticleRepository.getFeedArticlesByPage(page, condition)
        }catch (e) {
            console.log('error ser', e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async getFeedArticlesByBookmarks(profileId, page, next){
        try{
            let bookmarks = await ArticleRepository.getBookmarks(profileId)
            if(!bookmarks || bookmarks.length === 0 || (bookmarks[0] === '' && bookmarks.length === 1)){
                return []
            }
            bookmarks = bookmarks.filter(el => el !== '')
            bookmarks = bookmarks.map(el => Number(el))
            const condition = {id:  bookmarks}
            return await ArticleRepository.getFeedArticlesByPage(page, condition)
        }catch (e) {
            console.log('error ser', e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }
    async getModerationArticles(page, next){
        try{
            const condition = {is_moderated: false, is_draft: false}

            return await ArticleRepository.getFeedArticlesByPage(page, condition)
        }catch (e) {
            console.log('error ser', e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }


    async getDraftsTotalCount(id, next){
        try{
            const condition = {userId: id, is_draft: true, is_moderated: false}
            return await ArticleRepository.count(condition, next)
        }catch (e) {
            console.log('error repasd', e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async getModerationTotalCount(next){
        try{
            const condition = {is_draft: false, is_moderated: false}
            return await ArticleRepository.count(condition, next)
        }catch (e) {
            console.log('error repasd', e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

}

export const ArticleService = new ArticleServiceClass()