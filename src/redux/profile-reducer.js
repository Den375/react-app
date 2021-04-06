import {profileAPI} from "../api/api";

const ADD_POST = 'social-network/profile/ADD_POST';
const DELETE_POST = 'social-network/profile/DELETE_POST';
const SET_USER_PROFILE = 'social-network/profile/SET_USER_PROFILE';
const SET_STATUS = 'social-network/profile/SET_STATUS';

const initialState = {
    posts: [
        {id: 1, message: 'Изучаю React, и это мой первый пост', likesCount: 12},
        {id: 2, message: 'Я уже неплохо шарю', likesCount: 11},
        {id: 3, message: 'Чтобы написать актуальненькое', likesCount: 14},
    ],
    profile: null,
    status: null
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 8,
                message: action.newPostText,
                likesCount: 44
            }
            return  {
                ...state,
                posts: [...state.posts, newPost]
            }

        case DELETE_POST:
            return  {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }

        default:
            return state
    }
}

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const deletePost = (postId) => ({type: DELETE_POST, postId});


export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});

export const getUserProfile = (userId) => async (dispatch) => {
             const response = await profileAPI.getUserProfile(userId)
                 dispatch(setUserProfile(response.data))
}

export const getStatus = (userId) => async (dispatch) => {
   const response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
   const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
}

export default profileReducer;