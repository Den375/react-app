import {Users} from "./Users";
import {useSelector} from "react-redux";
import React, {FC} from "react";
import Preloader from "../common/preloader/Preloader";
import {getIsFetching} from "../../redux/users-selectors";

type PropsType = {
    pageTitle: string
}

const UsersPage: FC<PropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return <div>
        <h3>{props.pageTitle}</h3>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </div>
}

export default UsersPage

/*const AuthRedirect = withAuthRedirect(UsersContainer)

export default connect(mapStateToProps, {
    getUsers,
    setCurrentPage,
    follow,
    unfollow
})(AuthRedirect)*/

/*const mapStateToProps = (state) => {
        return {
            users: state.usersPage.users,
            currentPage: state.usersPage.currentPage,
            pageSize: state.usersPage.pageSize,
            totalUsersCount: state.usersPage.totalUsersCount,
            isFetching: state.usersPage.isFetching,
            isFollowingProgress: state.usersPage.isFollowingProgress,
        }
    }*/

/*const mapDispatchToProps = (dispatch) => {
        return {
            getUsers: (currentPage, pageSize) => {
                dispatch(gerUsersThunkCreator(currentPage, pageSize))
            },
            follow: (userID) => {
                dispatch(followAC(userID))
            },
            unFollow: (userID) => {
                dispatch(unFollowAC(userID))
            },
            setUsers: (users) => {
                dispatch(setUsersAC(users))
            },
            setCurrentPage: (pageNumber) => {
                dispatch(setCurrentPageAC(pageNumber))
            },
            setTotalUsersCount: (totalUsersCount) => {
                dispatch(setTotalUsersCountAC(totalUsersCount))
            },
            toggleIsFetching: (isFetching) => {
                dispatch(toggleIsFetchingAC(isFetching))
            }
        }
    }*/
