import React from 'react';
import ProfileInfo, {PropsType} from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile: React.FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo {...props} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;