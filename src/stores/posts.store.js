import { defineStore } from 'pinia'
import axios from '../utils/axios';
import { useAuthStore } from './auth.store';
import { useErrorStore } from './error.store';

export const usePostsStore = defineStore({
  id: 'posts-store',
  
  state: () => ({
    publishedPosts: [],
    draftPosts: [],
    unpublishedPosts: [],
    updatedPostWithSlug:null
  }),
  
  getters: {
    getPublishedPosts(){
        return this.publishedPosts;
    },
    getDraftPosts(){
        return this.draftPosts;
    },
    getUnpublishedPosts(){
        return this.unpublishedPosts;
    },
    getUpdatedPostWithSlug(){
        return this.updatedPostWithSlug;
    }
  },
  
  actions: {
    
    async createNewPost(data){
        try {
            const res = await axios.post(`/blogs`, data, useAuthStore().getAuthHeader);
            this.draftPosts.push(res.data.data);
            this.draftPosts.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at))
            this.updatePostBySlugInStore(res.data.data.slug);
            return { data: res.data, success: true }
        } catch (error) {
            console.log(error);
            return { data: error.response.data, success: false }
        }
    },
    async fetchPublishedPosts(){
        try {
            const res = await axios.get(`/blogs?status=published`, useAuthStore().getAuthHeader);
            this.publishedPosts = res.data.data;
            return { data: res.data, success: true }
        } catch (error) {
            console.log(error);
            return { data: error.response.data, success: false }
        }
    },
    async fetchUnpublishedPosts(){
        try {
            const res = await axios.get(`/blogs?status=unpublished`, useAuthStore().getAuthHeader);
            this.unpublishedPosts = res.data.data;
            return { data: res.data, success: true }
        } catch (error) {
            console.log(error);
            return { data: error.response.data, success: false }
        }
    },
    async fetchDraftPosts(query='page=1'){
        try {
            const res = await axios.get(`/blogs?status=draft`, useAuthStore().getAuthHeader);
            this.draftPosts = res.data.data;
            return { data: res.data, success: true }
        } catch (error) {
            console.log(error);
            return { data: error.response.data, success: false }
        }
    },
    async deletePostBySlug(slug){
        try {
            const res = await axios.delete(`/blogs/slug/${slug}`, useAuthStore().getAuthHeader);
            return { data: res.data, success: true }
        } catch (error) {
            useErrorStore().handle(error)
            return { data: error.response.data, success: false }
        }
    },
    async updatePostBySlug(slug, data){
        try {
            const res = await axios.patch(`/blogs/slug/${slug}`, data, useAuthStore().getAuthHeader);
            this.updatePostBySlugInStore(slug);
            return { data: res.data, success: true }
        } catch (error) {
            useErrorStore().handle(error)
            return { data: error.response.data, success: false }
        }
    },
    async updatePostStatusBySlug(slug, data){
        try {
            const res = await axios.patch(`/blogs/update-status/slug/${slug}`, data, useAuthStore().getAuthHeader);
            return { data: res.data, success: true }
        } catch (error) {
            useErrorStore().handle(error)
            return { data: error.response.data, success: false }
        }
    },
    async fetchAllPosts(){
        await this.fetchDraftPosts();
        await this.fetchPublishedPosts();
        await this.fetchUnpublishedPosts();
    },
    async fetchOnePostBySlug(slug){
        try {
            const res = await axios.get(`/blogs/slug/${slug}`, useAuthStore().getAuthHeader);
            return { data: res.data, success: true }      
        } catch (error) {
            useErrorStore().handle(error)
            return { data: error.response.data, success: false }
        }
    },
    clearUpdatedPostWithSlug(){
        this.updatedPostWithSlug = null
    },
    updatePostBySlugInStore(slug){
        let timer = setTimeout(async()=>{
            clearTimeout(timer);
            const res = await this.fetchOnePostBySlug(slug);
            let post = res.data.data;
            this.updatedPostWithSlug = post
            console.log("update post in ", post.status);
            let replace = p =>{
                if(p.slug === slug){
                    Object.assign(p, post);
                }
            };
    
            if(post.status === 'published'){
                this.publishedPosts.forEach(replace)
            }
            else if(post.status === 'draft'){
                this.draftPosts.forEach(replace)
            }
            else if(post.status === 'unpublished'){
                this.unpublishedPosts.forEach(replace)
            }
        }, 10000)
    },
    movePostBySlug(slug, source, target){
        let srcPost = null;
        const filter = (post) => {
            if(post.slug == slug) {
                srcPost = post;
                return false;
            } 
            return true;
        }

        const sort = (a,b) => new Date(b.created_at) - new Date(a.created_at)

        if(source === 'published'){
            this.publishedPosts = this.publishedPosts.filter(filter);
        }
        else if(source === 'draft'){
            this.draftPosts = this.draftPosts.filter(filter);
        }
        else if(source === 'unpublished'){
            this.unpublishedPosts = this.unpublishedPosts.filter(filter);
        }

        if(target === 'published'){
            srcPost.status = 'published';
            this.publishedPosts.push(srcPost);
            this.publishedPosts.sort(sort);
        }
        else if(target === 'draft'){
            srcPost.status = 'draft';
            this.draftPosts.push(srcPost);
            this.draftPosts.sort(sort);
        }
        else if(target === 'unpublished'){
            srcPost.status = 'unpublished';
            this.unpublishedPosts.push(srcPost);
            this.unpublishedPosts.sort(sort);
        }
    }
  },
});