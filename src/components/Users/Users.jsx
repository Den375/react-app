import React from "react";
import s from "./Users.module.css"

const Users = (props) => {
    if (props.users.length === 0) props.setUsers([
       {id: 1, photoUrl: 'https://sun2.beltelecom-by-minsk.userapi.com/impf/c830408/v830408071/17400a/ifSm7qTXagM.jpg?size=972x1296&quality=96&proxy=1&sign=eb5db13284235eb4512c5d8f5dc9544e&type=album',
           followed: false, fullName: 'Denis L.', status: 'I`m love ReactJs', location: {city: 'Kopyl', country: 'Belarus'}},
       {id: 2, photoUrl: 'https://sun2.beltelecom-by-minsk.userapi.com/impf/c830408/v830408071/17400a/ifSm7qTXagM.jpg?size=972x1296&quality=96&proxy=1&sign=eb5db13284235eb4512c5d8f5dc9544e&type=album',
           followed: true, fullName: 'Vasya F.', status: 'I`m love ReactJs', location: {city: 'Kopyl', country: 'Belarus'}},
       {id: 3, photoUrl: 'https://sun2.beltelecom-by-minsk.userapi.com/impf/c830408/v830408071/17400a/ifSm7qTXagM.jpg?size=972x1296&quality=96&proxy=1&sign=eb5db13284235eb4512c5d8f5dc9544e&type=album',
           followed: false, fullName: 'Jora V.', status: 'I`m love ReactJs', location: {city: 'Minsk', country: 'Belarus'}},
       {id: 4, photoUrl: 'https://sun2.beltelecom-by-minsk.userapi.com/impf/c830408/v830408071/17400a/ifSm7qTXagM.jpg?size=972x1296&quality=96&proxy=1&sign=eb5db13284235eb4512c5d8f5dc9544e&type=album',
           followed: true, fullName: 'Andrey L.', status: 'I`m love ReactJs', location: {city: 'Kopyl', country: 'Belarus'}}
   ])

    return <div>
        {props.users.map(u => <div className={s.userContainer} key={u.id}>
            <div className={s.class1}>
                <div>
                    <img src={u.photoUrl} alt="image"/>
                </div>
                <div>
                    {u.followed
                        ? <button onClick={() => props.unFollow(u.id)}>Unfollow</button>
                        : <button onClick={() => props.follow(u.id)}>Follow</button>}
                </div>
            </div>
            <div className={s.class2}>
                <div>
                     <div>{u.fullName}</div>
                     <div>{u.status}</div>
                </div>
                <div>
                    <div>{u.location.city}</div>
                    <div>{u.location.country}</div>
                </div>
            </div>
        </div>)}
    </div>
}

export default Users;