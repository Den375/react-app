import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus, savePhoto, saveProfile} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.refreshProfile()
        }
    }
// если не сравнивать пропсы зациклится, т.к.  каждый запрос новый dispatch и новый вызов mapState,
// profilePage.profile - всегда будет приходить новый объект и mapState будет делать рендер
// поэтому вызываем рефреш только при смене id
// При смене строки в браузере profile/xxxx  на profile Route или withRouter инициализирует рендер, id  в пропсах сменилось
//делаем рефреш

    /*componentWillUnmount() {
        alert('componentWillUnmount')
    }*/

    render() {

        return <Profile {...this.props} isOwner={!this.props.match.params.userId}
                        savePhoto={this.props.savePhoto} saveProfile={this.props.saveProfile}/>
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
    }
}

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

/*
const AuthRedirectContainer = withAuthRedirect(ProfileContainer)



const WithUrlDataContainerComponent =  withRouter(AuthRedirectContainer)

export default connect(mapStateToProps, {
    getUserProfile
} )(WithUrlDataContainerComponent)*/
