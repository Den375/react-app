const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOOGLE_IS_FETCHING = 'TOOGLE_IS_FETCHING';
const TOOGLE_IS_FOLLOWING_PROGRESS = 'TOOGLE_IS_FOLLOWING_PROGRESS';


const initialState = {
    users: [],
    currentPage: 1,
    pageSize: 5,
    totalUsersCount: 0,
    isFetching: false,
    isFollowingProgress: []
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
            return {...state, users: [...action.users]}

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.pageNumber }

        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount }

        case TOOGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching }

        case TOOGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                isFollowingProgress: action.progress
                                     ? [...state.isFollowingProgress, action.disabledId]
                                     : state.isFollowingProgress.filter(id => id != action.disabledId)
            }

        default:
            return state
    }
}

export const follow = (userID) => ({type: FOLLOW, userID});
export const unFollow = (userID) => ({type: UNFOLLOW, userID});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (pageNumber) => ({type: SET_CURRENT_PAGE, pageNumber})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type: TOOGLE_IS_FETCHING, isFetching})
export const toggleIsFollowingProgress = (progress, disabledId) => ({type: TOOGLE_IS_FOLLOWING_PROGRESS, progress, disabledId})

export default usersReducer;