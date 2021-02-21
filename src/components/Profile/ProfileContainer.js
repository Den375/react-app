import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profile-reducer";
import {Redirect, withRouter} from "react-router-dom";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = 2
        }
        this.props.getUserProfile(userId)
    }

    render() {
        if(!this.props.auth) return <Redirect to='login'/>

        return <Profile {...this.props} />
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        auth: state.auth.isAuth
    }
}

const WithUrlDataContainerComponent =  withRouter(ProfileContainer)

export default connect(mapStateToProps, {
    getUserProfile
} )(WithUrlDataContainerComponent)