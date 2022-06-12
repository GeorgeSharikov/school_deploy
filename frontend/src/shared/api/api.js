import axios from 'axios'
import { getCookie } from '../helpers/getCookie';
import {BASE_SERVER_URL} from "../../constants/url.js";

const getAuthHeaders = () => ({
        'Authorization': `Bearer ${getCookie('token')}`
})

const instance = axios.create({
    baseURL: `${BASE_SERVER_URL}`,
});

class User{
    constructor(apiBase){
        this.apiBase = apiBase
    }

    async registration(email, password, firstName, lastName){
        try{
            const response = await instance.post(`${this.apiBase}/registration`, {
            email, password, firstName, lastName
            },{headers: getAuthHeaders()})
            return response
        }catch(e){
            if(e.response){
                if(e.response.status === 404){
                    throw new Error(e?.response?.data?.message)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }

    async checkAuth(){
        try{
            console.log(getAuthHeaders())
           const response = await instance.get(`${this.apiBase}/auth`, {
               headers: getAuthHeaders()
           })
           return response
        }catch(e){
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            } 
        }
    }

    async login(userData){
        try{
            const {email, password} = userData
            const res = await instance.post(`${this.apiBase}/login`, {email: email, password: password}, {
                headers: getAuthHeaders()
            })
            return res
        }catch(e){
            if(e.response){
                if(e.response.status === 404){
                    throw new Error(e?.response?.data?.message)
                }
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }
    async getAllUsers(){
        try{
            const {data} = await instance.get(`${this.apiBase}/getAllUsers`,  {
                headers: getAuthHeaders()
            })
            return data
        }catch(e){
            if(e.response){
                if(e.response.status === 404){
                    throw new Error(e?.response?.data?.message)
                }
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }
    async resetUserPassword(id){
        try{
            const {data} = await instance.put(`${this.apiBase}/resetUserPassword?id=${id}`,  {},{
                headers: getAuthHeaders()
            })
            return {data}
        }catch(e){
            if(e.response){
                if(e.response.status === 404){
                    throw new Error(e?.response?.data?.message)
                }
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }
    async changeStatus(status){
        try{
            const {data} = await instance.put(`${this.apiBase}/changeStatus`, {status},{
                headers: getAuthHeaders()
            })
            return data
        }catch(e){
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }
    async changePassword(password){
        try{
            const {data} = await instance.put(`${this.apiBase}/changePassword`,  {password},{
                headers: getAuthHeaders()
            })
            return {data}
        }catch(e){
            if(e.response){
                if(e.response.status === 404){
                    throw new Error(e?.response?.data?.message)
                }
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }
}
export const UserApi = new User('user')

class UserInfo{
    constructor(apiBase){
        this.apiBase = apiBase
    }
    async getPersonalData(){
        try{
            instance.defaults.headers['Authorization'] = `Bearer ${getCookie('token')}`
            const response = await instance.get(`${this.apiBase}/getPersonalData`, {
                headers: getAuthHeaders()
            })
            return response
        }catch(e){
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            } 
        }
    }
    async getOtherPersonalData(id){
        try{
            const response = await instance.get(`${this.apiBase}/getOtherPersonalData?id=${id}`, {
                headers: getAuthHeaders()
            })
            return response
        }catch(e){
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }


}
export const UserInfoApi = new UserInfo('userInfo')

class Article{
    constructor(apiBase){
        this.apiBase = apiBase
    }

    async createArticle(data){
        try{
            const {article, isModerated:is_moderated, isDraft: is_draft} = data
            const response = await instance.post(`${this.apiBase}/createArticle`, {article, is_moderated, is_draft},{
                headers: getAuthHeaders()
            })
            return response
        }catch (e) {
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }

    async update(data){
        try{
            const {article, isModerated:is_moderated, isDraft: is_draft, articleId} = data
            const response = await instance.put(`${this.apiBase}/updateArticle`, {articleId, article, is_moderated, is_draft},{
                headers: getAuthHeaders()
            })
            return response
        }catch (e) {
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }

    async delete(id){
        try{
            const response = await instance.delete(`${this.apiBase}/deleteArticle?articleId=${id}`, {
                headers: getAuthHeaders()
            })
            return response
        }catch (e) {
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }

    async deleteArticleByAdmin(id){
        try{
            const response = await instance.delete(`${this.apiBase}/deleteArticleByAdmin?articleId=${id}`, {
                headers: getAuthHeaders()
            })
            return response
        }catch (e) {
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }

    async getAllArticles(){
        try{
            const {data} = await instance.get(`${this.apiBase}/getAllArticles`, {
                headers: getAuthHeaders()
            })
            return data
        }catch (e) {
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }

    async getFeedArticlesByPortions(page){
        try{
            const response = await instance.get(`${this.apiBase}/getFeedArticles/?page=${page}`, {
                headers: getAuthHeaders()
            })
            return response
        }catch (e) {
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }

    async getFeedArticlesById(page, id){
        try{
            const response = await instance.get(`${this.apiBase}/getFeedArticlesById?page=${page}&id=${id}`, {
                headers: getAuthHeaders()
            })
            return response
        }catch (e) {
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }

    async getDraftsArticles(page, id){
        try{
            const response = await instance.get(`${this.apiBase}/getDraftsArticles?id=${id}&page=${page}`, {
                headers: getAuthHeaders()
            })
            return response
        }catch (e) {
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }

    async getDraftsTotalCount(){
        try{
            const response = await instance.get(`${this.apiBase}/getDraftsTotalCount`, {
                headers: getAuthHeaders()
            })
            return response
        }catch (e) {
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }


    async getFeedArticlesByBookmarks(page){
        try{
            const response = await instance.get(`${this.apiBase}/getFeedArticlesByBookmarks?page=${page}`, {
                headers: getAuthHeaders()
            })
            return response
        }catch (e) {
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }

    async getModerationArticles(page){
        try{
            const response = await instance.get(`${this.apiBase}/getModerationArticles?page=${page}`, {
                headers: getAuthHeaders()
            })
            return response
        }catch (e) {
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }

    async getModerationTotalCount(){
        try{
            const response = await instance.get(`${this.apiBase}/getModerationTotalCount`, {
                headers: getAuthHeaders()
            })
            return response
        }catch (e) {
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }

    async getArticlesTotalCount({isModerated, id}){
        try{
            let queryStrID = id ? `profileId=${id}` : ''
            const response = await instance.get(`${this.apiBase}/getCountOfAllArticles/?isModerated=${isModerated}&${queryStrID}`, {
                headers: getAuthHeaders()
            })
            return response
        }catch (e) {
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }

    async getBookmarksTotalCount(){
        try{
            const response = await instance.get(`${this.apiBase}/getBookmarksTotalCount`, {
                headers: getAuthHeaders()
            })
            return response
        }catch (e) {
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }

    async getArticle(id){
        try{
            return await instance.get(`${this.apiBase}/getArticle/?id=${id}`, {
                headers: getAuthHeaders()
            })
        }catch (e) {
            if(e.response){
                if(e.response.status === 404){
                    throw new Error(e?.response?.data?.message)
                }
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }

    async getArticleForEditor(id){
        try{
            const {data} = await instance.get(`${this.apiBase}/getArticleForEditor/?id=${id}`, {
                headers: getAuthHeaders()
            })
            return data
        }catch (e) {
            if(e.response){
                if(e.response.status === 404){
                    throw new Error(e?.response?.data?.message)
                }
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }

    async like(articleId){
        try{
            const {data} = await instance.post(`${this.apiBase}/like/?id=${articleId}`, {},{
                headers: getAuthHeaders()
            })
            return data
        }catch (e) {
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }
    async disLike(articleId){
        try{
            const {data} = await instance.post(`${this.apiBase}/dislike/?id=${articleId}`, {},{
                headers: getAuthHeaders()
            })
            return data
        }catch (e) {
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }
    async addBookmark(articleId){
        try{
            const data = await instance.post(`${this.apiBase}/bookmark/?id=${articleId}`, {},{
                headers: getAuthHeaders()
            })
            return data
        }catch (e) {
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }
    async getBookmarks(){
        try{
            const data = await instance.get(`${this.apiBase}/getBookmarks`, {
                headers: getAuthHeaders()
            })
            return data
        }catch (e) {
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }

    async publish(id){
        try{
            const data = await instance.put(`${this.apiBase}/publishArticle?articleId=${id}`, {},{
                headers: getAuthHeaders()
            })
            return data
        }catch (e) {
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }

    async decline(id){
        try{
            const data = await instance.put(`${this.apiBase}/declineArticle?articleId=${id}`, {},{
                headers: getAuthHeaders()
            })
            return data
        }catch (e) {
            if(e.response){
                if(e.response.status !== 401){
                    throw new Error(e?.response?.statusText)
                }
                throw new Error(e?.response?.data?.message)
            }else{
                throw new Error('Неизвестная ошибка. Попробуйте перезагрузить страницу.')
            }
        }
    }
}
export const ArticleApi = new Article('article')