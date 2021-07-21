import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus, savePhoto, saveProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
type PathParamsType = {
    userId: string
}
type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                // todo: may be replace push with Redirect??
                this.props.history.push("/login");
            }
        }
        if (!userId) {
            console.error("ID should exists in URI params or in state ('authorizedUserId')");
        } else {
            this.props.getUserProfile(userId)
            this.props.getStatus(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.refreshProfile()
        }
    }
// если не сравнивать пропсы зациклится, т.к.  каждый запрос новый dispatch и новый вызов mapState,
// profilePage.profile - всегда будет приходить новый объект и mapState будет делать рендер
// поэтому вызываем рефреш только при смене id
// При смене строки в браузере profile/---  на profile Route или withRouter инициализирует рендер, id  в пропсах сменилось
//делаем рефреш

    /*componentWillUnmount() {
        alert('componentWillUnmount')
    }*/

    render() {

        return <Profile {...this.props} isOwner={!this.props.match.params.userId}
                        savePhoto={this.props.savePhoto} saveProfile={this.props.saveProfile}/>
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter
   /* withAuthRedirect*/
)(ProfileContainer)

/*
const AuthRedirectContainer = withAuthRedirect(ProfileContainer)



const WithUrlDataContainerComponent =  withRouter(AuthRedirectContainer)

export default connect(mapStateToProps, {
    getUserProfile
} )(WithUrlDataContainerComponent)*/
