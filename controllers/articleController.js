import {ArticleService} from "../services/article/article-service.js";
import {ApiError} from "../error/ApiError.js";
import {ArticleModel} from "../db/models/models.js";

class Article{
    async getFeedArticles(req, res, next){
        try{
            const page = req.query.page

            const articles = await ArticleService.getFeed(page)
            res.send(articles)
        }catch (e) {
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }
    async getArticle(req, res, next){
        const id = req.query.id
        const article = await ArticleService.getOne(id, next)
        if(article){
            res.send(article)
        }
    }

    async getArticleForEdit(req, res, next){
        const id = req.query.id
        const articleData = await ArticleService.getOneEditArticle(id, next)
        res.send(articleData)
    }

    async createArticle(req, res, next){
        try{
            const articleData = req.body
            const userId = req.user.id
            const article = await ArticleService.create(articleData, userId, next)
            res.send(article)
        }catch (e) {
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async updateArticle(req, res, next){
        try{
            const articleData = req.body
            const status = await ArticleService.update(articleData, next)
            res.send({status})
        }catch (e) {
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }
    async delete(req, res, next){
        try{
            const articleId = req.query.articleId
            const userId = req.user.id
            const status = await ArticleService.delete(userId,articleId , next)
            res.send({status})
        }catch (e) {
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async deleteArticleByAdmin(req, res, next){
        try{
            const articleId = req.query.articleId

            const status = await ArticleService.deleteArticleByAdmin(articleId , next)
            res.send({status})
        }catch (e) {
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async getCountOfAllArticles(req, res, next){
        try{
            const count = await ArticleService.countArticles(req.query, next)
            res.send({totalCount: count})
        }catch (e) {
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }
    async like(req, res, next){
        try{
            const id = req.user.id
            const articleId = req.query.id

            const likeCount = await ArticleService.like(articleId, id, next)
            res.send({likeCount})
        }catch (e) {
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async dislike(req, res, next){
        try{
            const id = req.user.id
            const articleId = req.query.id

            const likeCount = await ArticleService.dislike(articleId, id, next)
             res.send({likeCount})
        }catch (e) {
            console.log(e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async addBookmark(req, res, next){
        try{
            const id = req.user.id
            const articleId = req.query.id

            const bookmarks = await ArticleService.addBookmark(articleId, id, next)
            if(bookmarks){
                res.send(bookmarks)
            }
        }catch (e) {
            console.log(e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async getBookmarks(req, res, next){
        try{
            const userId = req.user.id

            const bookmarks = await ArticleService.getBookmarks(userId, next)
            if(bookmarks){
                res.send(bookmarks)
            }
        }catch (e) {
            console.log(e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async getBookmarksTotalCount(req, res, next){
        try{
            const userId = req.user.id

            const count = await ArticleService.getBookmarksTotalCount(userId, next)
             res.send({totalCount: count})
        }catch (e) {
            console.log(e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async getFeedArticlesById(req, res, next){
        try{
            const profileId = req.query.id
            const page = req.query.page

            const articles = await ArticleService.getFeedArticlesById(profileId, page, next)
            res.send(articles)
        }catch (e) {
            console.log(e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }


    async getDraftsArticles(req, res, next){
        try{
            let profileId = req.query.id
            profileId = Number(profileId)
            const authUserId = req.user.id
            const page = req.query.page

            if(authUserId !== profileId){
                next(ApiError.badRequest('Статей не найдено.'))
            }
            const articles = await ArticleService.getDraftsArticlesById(profileId, page, next)
            res.send(articles)
        }catch (e) {
            console.log(e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }
    async getFeedArticlesByBookmarks(req, res, next){
        try{
            let profileId = req.user.id
            profileId = Number(profileId)
            const page = req.query.page
            const articles = await ArticleService.getFeedArticlesByBookmarks(profileId, page, next)
            res.send(articles)
        }catch (e) {
            console.log(e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async getModerationArticles(req, res, next){
        try{
            const page = req.query.page
            const articles = await ArticleService.getModerationArticles(page)
            res.send(articles)
        }catch (e) {
            console.log(e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async getDraftsTotalCount(req, res, next){
        try{
            const id = req.user.id
            const count = await ArticleService.getDraftsTotalCount(id,next)
            res.send({totalCount: count})
        }catch (e) {
            console.log('error repasd', e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    async getModerationTotalCount(req, res, next){
        try{
            const count = await ArticleService.getModerationTotalCount(next)
            res.send({totalCount: count})
        }catch (e) {
            console.log('error repasd', e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }
    async publishArticle(req, res, next){
        try{
            const articleId = req.query.articleId
            await ArticleModel.update(
                {is_moderated: true},
                {where: {id: articleId}}
            )
            res.send({status: 'ok'})
        }catch (e) {
            console.log('error repasd', e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }
    async declineArticle(req, res, next){
        try{
            const articleId = req.query.articleId
            await ArticleModel.update(
                {is_draft: true},
                {where: {id: articleId}}
            )
            res.send({status: 'ok'})
        }catch (e) {
            console.log('error repasd', e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }
}

export const ArticleController = new Article()