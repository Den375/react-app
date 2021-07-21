import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api";
import {ResultCodesEnum} from "../api/api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

const initialState = {
    posts: [
        {id: 1, message: 'React Js учебный проект', likesCount: 12},
        {id: 2, message: 'There are a very important posts', likesCount: 11},
        {id: 3, message: 'Contains something great', likesCount: 14},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
};

const profileReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case "SN/PROFILE/ADD_POST":
            let newPost = {
                id: 8,
                message: action.newPostText,
                likesCount: 44
            }
            return  {...state, posts: [...state.posts, newPost]}

        case "SN/PROFILE/DELETE_POST":
            return  {...state, posts: state.posts.filter(p => p.id != action.postId)}

        case "SN/PROFILE/SET_USER_PROFILE":
            return {...state, profile: action.profile}

        case "SN/PROFILE/SET_STATUS":
            return {...state, status: action.status}

        case "SN/PROFILE/SAVE_PHOTO_SUCCESS":
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType }

        default:
            return state
    }
}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'SN/PROFILE/ADD_POST', newPostText} as const),
    deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos } as const)
}

export const getUserProfile = (userId: number ): ThunkType => async (dispatch) => {
             const profile = await profileAPI.getUserProfile(userId)
                 dispatch(actions.setUserProfile(profile))
}

export const getStatus = (userId: number):ThunkType => async (dispatch) => {
   const status = await profileAPI.getStatus(userId)
        dispatch(actions.setStatus(status))
}

export const updateStatus = (status: string):ThunkType => async (dispatch) => {
   try {
       const data = await profileAPI.updateStatus(status)
       if (data.resultCode === ResultCodesEnum.Success) {
           dispatch(actions.setStatus(status))
       }
   } catch (error) {
       alert(error.message)
   }

}

export const savePhoto = (file: File):ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType):ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId

    const data = await profileAPI.saveProfile(profile)

    if (data.resultCode === ResultCodesEnum.Success) {
        if (userId != null) {
            dispatch(getUserProfile(userId))
        }
        else {
            throw new Error("userId can't be null")
        }
    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
        return Promise.reject()
    }
}

export default profileReducer

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>