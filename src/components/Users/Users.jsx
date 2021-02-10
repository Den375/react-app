import React from "react";
import s from "./Users.module.css"
import * as axios from "axios";
import userDefPhoto from '../../assets/images/defaultAvatar.jpg'

class Users extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)
        })
    }

    onPageChanged(p) {
        this.props.setCurrentPage(p)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)
        })
    }

    render() {

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        if (pagesCount > 20) {pagesCount = 20}
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return <div>
            <div>
                {pages.map( p => {
                    return <span className={this.props.currentPage === p ? s.currentPage : null}
                                 onClick={() => this.onPageChanged(p)}> {p} </span>
                })}
            </div>

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

