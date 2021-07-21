import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import logo from '../../assets/images/companyLogo.png'

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}
export type DispatchPropsType = {
    logout: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
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