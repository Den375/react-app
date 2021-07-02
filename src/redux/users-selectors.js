import {createSelector} from "reselect";
// зависимость
const getUsersSelector = (state) => {
    return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true)  // если не использовать наш селектор, при каждом dispatch будет вызов mapState и в памяти будет создаваться новый массив
})                                  // что ухудшит производительность. filter здесь излишний, для примера


export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const getPageSize = (state) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress
}

export const getIsAuth = (state) => {
    return state.auth.isAuth
}