import {CheckAccess, CheckAuth} from "../middleware/CheckAuthMiddleware.js";
import {Router} from "express";
import {ArticleController} from "../controllers/articleController.js";

const router = new Router()

router.get('/getFeedArticles',ArticleController.getFeedArticles)
router.get('/getCountOfAllArticles', ArticleController.getCountOfAllArticles)
router.get('/getArticle', ArticleController.getArticle)
router.get('/getArticleForEditor',CheckAuth, ArticleController.getArticleForEdit)

router.post('/createArticle', CheckAuth, ArticleController.createArticle)
router.put('/updateArticle',CheckAuth, ArticleController.updateArticle)
router.delete('/deleteArticle', CheckAuth, ArticleController.delete)
router.delete('/deleteArticleByAdmin',CheckAccess('ADMIN'), ArticleController.delete)

router.post('/like',CheckAuth, ArticleController.like)
router.post('/dislike',CheckAuth, ArticleController.dislike)

router.post('/bookmark',CheckAuth, ArticleController.addBookmark)
router.get('/getBookmarks',CheckAuth, ArticleController.getBookmarks)
router.get('/getBookmarksTotalCount',CheckAuth, ArticleController.getBookmarksTotalCount)


router.get('/getFeedArticlesById', ArticleController.getFeedArticlesById)

router.get('/getDraftsArticles',CheckAuth, ArticleController.getDraftsArticles)
router.get('/getDraftsTotalCount',CheckAuth, ArticleController.getDraftsTotalCount)

router.get('/getFeedArticlesByBookmarks',CheckAuth, ArticleController.getFeedArticlesByBookmarks)
router.get('/getModerationArticles',CheckAccess('ADMIN'), ArticleController.getModerationArticles)
router.get('/getModerationTotalCount',CheckAccess('ADMIN'), ArticleController.getModerationTotalCount)
router.put('/publishArticle', CheckAccess('ADMIN'), ArticleController.publishArticle)
router.put('/declineArticle', CheckAccess('ADMIN'), ArticleController.declineArticle)


export const articleRouter = router