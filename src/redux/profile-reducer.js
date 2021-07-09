import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'social-network/profile/ADD_POST';
const DELETE_POST = 'social-network/profile/DELETE_POST';
const SET_USER_PROFILE = 'social-network/profile/SET_USER_PROFILE';
const SET_STATUS = 'social-network/profile/SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'social-network/profile/SAVE_PHOTO_SUCCESS'

const initialState = {
    posts: [
        {id: 1, message: 'React Js учебный проект', likesCount: 12},
        {id: 2, message: 'There are a very important posts', likesCount: 11},
        {id: 3, message: 'Contains something great', likesCount: 14},
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
            return  {...state, posts: [...state.posts, newPost]}

        case DELETE_POST:
            return  {...state, posts: state.posts.filter(p => p.id != action.postId)}

        case SET_USER_PROFILE:
            return {...state, profile: action.profile}

        case SET_STATUS:
            return {...state, status: action.status}

        case SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos} }

        default:
            return state
    }
}

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const deletePost = (postId) => ({type: DELETE_POST, postId});


export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});

export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId) => async (dispatch) => {
             const response = await profileAPI.getUserProfile(userId)
                 dispatch(setUserProfile(response.data))
}

export const getStatus = (userId) => async (dispatch) => {
   const response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
   try {
       const response = await profileAPI.updateStatus(status)
       if (response.data.resultCode === 0) {
           dispatch(setStatus(status))
       }
   } catch (error) {
       alert(error.message)
   }

}

export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId

    const response = await profileAPI.saveProfile(profile)

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}))
        return Promise.reject()
    }
}

export default profileReducer;