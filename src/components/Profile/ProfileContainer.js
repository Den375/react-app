import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {usersAPI} from "../../api/api";

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = 2
        }
        usersAPI.getUserProfile(userId).then(response => {
            this.props.setUserProfile(response)
        })
    }

    render() {
        return <Profile {...this.props} />
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile
    }
}

const WithUrlDataContainerComponent =  withRouter(ProfileContainer)

export default connect(mapStateToProps, {
    setUserProfile
} )(WithUrlDataContainerComponent)