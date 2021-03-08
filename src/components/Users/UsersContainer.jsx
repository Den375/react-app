import Users from "./Users";
import {connect} from "react-redux";
import {
     requestUsers,
    setCurrentPage,
    follow, unfollow,
} from "../../redux/users-reducer";
import React from "react";
import Preloader from "../common/preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getIsFetching,
    getIsFollowingProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }


    onPageChanged = (p) => {
        this.props.setCurrentPage(p)
        this.props.requestUsers(p, this.props.pageSize)
    }

    render() {
        return <>
                 {this.props.isFetching ? <Preloader/> : null}
                 <Users totalUsersCount={this.props.totalUsersCount}
                         pageSize={this.props.pageSize}
                         currentPage={this.props.currentPage}
                         users={this.props.users}
                         onPageChanged={this.onPageChanged}
                         unfollow={this.props.unfollow}
                         follow={this.props.follow}
                         isFollowingProgress={this.props.isFollowingProgress}/>
               </>
    }
}

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

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        isFetching: getIsFetching(state),
        isFollowingProgress: getIsFollowingProgress(state),
    }
}

export default compose(
    connect(mapStateToProps, { requestUsers, setCurrentPage, follow, unfollow}),
    /*withAuthRedirect*/
)(UsersContainer)


/*const AuthRedirect = withAuthRedirect(UsersContainer)

export default connect(mapStateToProps, {
    getUsers,
    setCurrentPage,
    follow,
    unfollow
})(AuthRedirect)*/


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
