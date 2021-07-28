import React, {FC} from 'react';
import {Link, NavLink} from "react-router-dom";
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUserLogin, selectIsAuth} from "../../redux/auth-selectors";
import {logout} from "../../redux/auth-reducer";

export const Header: FC = () => {

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }

    const {Header} = Layout
    return  <Header className="header">
        <div className="logo" />
        <Row>
            <Col span={20}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['']} >
                    <Menu.Item key="1">
                        <Link to='/developers'>Developers</Link>
                    </Menu.Item>
                </Menu>
            </Col>
            {isAuth
                ? <>
                    <Col span={4}>
                         <Avatar alt={login || ''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                         <Button style={{marginLeft: '10px'}} onClick={logoutCallback}>Logout</Button>
                    </Col>
                  </>
                : <Col span={4}>
                    <Button>
                        <Link to='/login'>Login</Link>
                    </Button>
                  </Col>
            }
        </Row>
    </Header>


 /*   <header className={s.header}>
        <img src={logo} />
        {props.isAuth
            ? <div className={s.login} >
                {props.login}
                <button onClick={props.logout}>Выйти</button>
              </div>
            : <NavLink className={s.login} to='/login'>Войдите на сайт</NavLink> }
    </header>*/
}
