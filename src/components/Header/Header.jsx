import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return <header className={s.header}>
        <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' />
        {props.isAuth
            ? <div className={s.login} >
                {props.login}
                <button onClick={props.logout}>Выйти</button>
               </div>



            : <NavLink className={s.login} to='/login'>Войдите на сайт</NavLink> }
    </header>
}

export default Header;