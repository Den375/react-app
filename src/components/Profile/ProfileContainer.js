import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = 2
        }
        this.props.getUserProfile(userId)
    }

    render() {

        return <Profile {...this.props} />
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
    }
}

export default compose(
    connect(mapStateToProps, {
        getUserProfile
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

/*
const AuthRedirectContainer = withAuthRedirect(ProfileContainer)



const WithUrlDataContainerComponent =  withRouter(AuthRedirectContainer)

export default connect(mapStateToProps, {
    getUserProfile
} )(WithUrlDataContainerComponent)*/
