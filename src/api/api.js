import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials:true,
    headers:   {
                 'API-KEY': '4c50052f-9e57-4c8d-8df3-b1216d8578e6'
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    unFollow(id) {
        return instance.delete(`follow/${id}`)
    },
    follow(id) {
        return instance.post(`follow/${id}`)
    }
}

export const profileAPI = {
    getUserProfile(id) {
        return instance.get(`profile/${id}`)
    },
    getStatus(id) {
        return instance.get(`/profile/status/${id}`)
    },
    updateStatus(status) {
        return instance.put(`/profile/status`, {status: status})
    }
}

export const authAPI = {
    me() {
       return instance.get(`auth/me`)
    },

    login(email, password, rememberMe = false) {
           return instance.post(`auth/login`, {email, password, rememberMe})
    },

    logout() {
           return instance.delete(`auth/login`)
    }
}



