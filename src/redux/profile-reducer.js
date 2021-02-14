const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

const initialState = {
    posts: [
        {id: 1, message: 'Изучаю React', likesCount: 12},
        {id: 2, message: 'Я уже неплохо шарю', likesCount: 11},
    ],
    newPostText: '',
    profile: null
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        case ADD_POST:
            let newPost = {
                id: 8,
                message: state.newPostText,
                likesCount: 44
            }
            return  {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state
    }
}

export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});
export const addPostActionCreator = () => ({type: ADD_POST});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export default profileReducer;