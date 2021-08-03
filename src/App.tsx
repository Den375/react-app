import React, {Suspense} from 'react';
import './App.css';
import 'antd/dist/antd.css'
import {HashRouter, Link, Redirect, Route, Switch, withRouter} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {Header} from "./components/Header/Header";
import Preloader from "./components/common/preloader/Preloader";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import store, {AppStateType} from "./redux/redux-store";
import {Breadcrumb, Layout, Menu} from "antd";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';


const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;

const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const LoginPage = React.lazy(() => import("./components/Login/Login"));
const ChatPage = React.lazy(() => import("./pages/Chat/ChatPage"));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert(`Some error occurred`);
        //console.error(promiseRejectionEvent);
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <Layout>
                <Header/>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                /*defaultSelectedKeys={['1']}*/
                                /*defaultOpenKeys={['sub1']}*/
                                style={{height: '100%'}}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined/>} title="My Profile">
                                    <Menu.Item key="1"><Link to="/profile">Profile</Link></Menu.Item>
                                    <Menu.Item key="2"><Link to="/dialogs">Messages</Link></Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                                    <Menu.Item key="5"><Link to='/developers'>Developers</Link></Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<NotificationOutlined/>} title="Chat">
                                    <Menu.Item key="9"><Link to='/chat'>Chat</Link></Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Suspense fallback={<div><Preloader/></div>}>
                                <Switch>
                                    <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                                    <Route path='/profile/:userId?' component={ProfileContainer}/>
                                    <Route path='/dialogs' component={DialogsContainer}/>
                                    <Route path='/developers'
                                           render={() => <UsersContainer pageTitle={'React Juniors list'}/>}/>
                                    <Route path='/login' component={LoginPage}/>
                                    <Route path='/chat' component={ChatPage}/>
                                    <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                                </Switch>
                            </Suspense>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Social Network ©2021 Created by Denis Denisov</Footer>
            </Layout>

            /*          <div className='app-wrapper'>
                          <HeaderContainer/>
                          <Navbar/>
                          <div className='app-wrapper-content'>
                                      <Suspense fallback={<div> <Preloader/> </div>}>
                                          <Switch>
                                              <Route exact path='/' render={() => <Redirect to={'/profile'}/>} />
                                              <Route path='/profile/:userId?' component={ProfileContainer}/>
                                              <Route path='/dialogs' component={DialogsContainer}/>
                                              <Route path='/users' render={() => <UsersContainer pageTitle={'React Juniors list'}/>}/>
                                              <Route path='/login' component={LoginPage}/>
                                              <Route path='*' render={() => <div>404 NOT FOUND <Button type={"dashed"}>Hello</Button></div>}/>
                                          </Switch>
                                      </Suspense>
                          </div>
                      </div>*/
        )
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        initialized: state.app.initialized
    }
}

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SocialNetwork: React.FC = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default SocialNetwork;

/*'/profile/:userId?'  profile/ тоже рендерит благодаря ?
параметр становится опциональным*/

