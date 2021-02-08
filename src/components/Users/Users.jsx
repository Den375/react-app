import React from "react";
import s from "./Users.module.css"
import * as axios from "axios";
import userDefPhoto from '../../assets/images/defaultAvatar.jpg'

class Users extends React.Component {

    constructor(props) {
        super(props);
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            props.setUsers(response.data.items)
        })
    }

    render() {
        return <div>
            {this.props.users.map(u => <div className={s.userContainer} key={u.id}>
                <div className={s.class1}>
                    <div>
                        <img src={u.photos.small != null ? u.photos.small : userDefPhoto} alt="image"/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => this.props.unFollow(u.id)}>Unfollow</button>
                            : <button onClick={() => this.props.follow(u.id)}>Follow</button>}
                    </div>
                </div>
                <div className={s.class2}>
                    <div>{u.name}</div>
                    <div>{'u.location.city'}</div>
                    <div></div>
                    <div></div>
                    <div>{'u.status'}</div>
                    <div>{'u.location.country'}</div>
                </div>
            </div>)}
        </div>
    }
}

export default Users;

