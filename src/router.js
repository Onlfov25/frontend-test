import { Router, Route, Link, hashHistory, IndexRoute }  from 'react-router'
// import Layout from './layout'
// import Login from './login'
// import Home from './home'

export default () => {
    return (
        // 参数 history 表示切换路由的方法
        <Router history="hashHistory">  
            <Route path="/" component="Layout">
                <IndexRoute component="Home"></IndexRoute>
                <Route path="login" component="Login"></Route>
                <Route path="test" component="Test"></Route>
            </Route>
        </Router>
    )
}
