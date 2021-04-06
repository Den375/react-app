import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import logo from '../../assets/images/companyLogo.png'

const Header = (props) => {
    return <header className={s.header}>
        <img src={logo} />
        {props.isAuth
            ? <div className={s.login} >
                {props.login}
                <button onClick={props.logout}>Выйти</button>
              </div>
            : <NavLink className={s.login} to='/login'>Войдите на сайт</NavLink> }
    </header>
}

export default Header;