import React from 'react';
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = React.memo((props) => {
    let path = "/dialogs/" + props.id;
    ///console.log('render DialogItem')
    return <div className={s.dialog + ' ' + s.active}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>
})

export default DialogItem;