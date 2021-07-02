import {usersAPI} from "../api/api";

const FOLLOW = 'social-network/users/FOLLOW';
const UNFOLLOW = 'social-network/users/UNFOLLOW';
const SET_USERS = 'social-network/users/SET_USERS';
const SET_CURRENT_PAGE = 'social-network/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'social-network/users/SET_TOTAL_USERS_COUNT';
const TOOGLE_IS_FETCHING = 'social-network/users/TOOGLE_IS_FETCHING';
const TOOGLE_IS_FOLLOWING_PROGRESS = 'social-network/users/TOOGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
    users: [],
    currentPage: 1,
    pageSize: 5,
    totalUsersCount: 0,
    isFetching: false,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case FOLLOW:
            return  {...state,
                users: state.users.map( u => {
                    if (u.id === action.userID) {
                       return {...u, followed: true}  /// иммутабельность, все что изменяем делаем глубокую копию
                    }
                    return u
                })
            }

        case UNFOLLOW:
            return  {...state,
                users: state.users.map( u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }

        case SET_USERS:
            return {...state, users: [...action.users]}     /// если не сделать глубокую копию mapStateToProps не увидит изменение массива users

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.pageNumber }

        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount }

        case TOOGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching }

        case TOOGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.progress
                                     ? [...state.followingInProgress, action.disabledId]         // добавляем в массив
                                     : state.followingInProgress.filter(id => id != action.disabledId) // достаем из массива
            }

        default:
            return state
    }
}

const toggleIsFetching = (isFetching) => ({type: TOOGLE_IS_FETCHING, isFetching})
const setUsers = (users) => ({type: SET_USERS, users});
const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})

const followSuccess = (userID) => ({type: FOLLOW, userID});
const unFollowSuccess = (userID) => ({type: UNFOLLOW, userID});
const toggleIsFollowingProgress = (progress, disabledId) => ({type: TOOGLE_IS_FOLLOWING_PROGRESS, progress, disabledId})

export const setCurrentPage = (pageNumber) => ({type: SET_CURRENT_PAGE, pageNumber})


export const requestUsers = (page, pageSize) => async (dispatch) => {
        dispatch(toggleIsFetching(true))

        const data = await usersAPI.getUsers(page, pageSize)
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
            dispatch(toggleIsFetching(false))
}

export const onPageChanged = (p, pageSize) => (dispatch) => {
    dispatch(setCurrentPage(p))
    dispatch(requestUsers(p, pageSize))
}

export const unfollow = (userID) => async (dispatch) => {
        dispatch(toggleIsFollowingProgress(true, userID))

        const response = await usersAPI.unFollow(userID)
            if (response.data.resultCode === 0) {
                dispatch(unFollowSuccess(userID))
            }
            dispatch(toggleIsFollowingProgress(false, userID))
}

export const follow = (userID) => async (dispatch) => {
        dispatch(toggleIsFollowingProgress(true, userID))

        const response = await usersAPI.follow(userID)
            if (response.data.resultCode === 0) {
                dispatch(followSuccess(userID))
            }
            dispatch(toggleIsFollowingProgress(false, userID))

}

export default usersReducer;