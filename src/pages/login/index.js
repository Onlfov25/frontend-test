import React from 'react'
import LoginForm from './loginForm.js'
import axios from 'axios'

class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        setTimeout(() => {
            axios.get('/base/fcgi-bin/fcg_wxdownload_config.fcg', { credentials: 'include', headers: { 'Accept': 'application/json, text/plain, */*' } })
            .then(res=>{
                console.log(res)
            })
            .catch(error=>{
                console.log(error)
            })
        }, 2000)
    }
    render() {
        return (
            <div>
                <h1>登录</h1>
                <LoginForm />
            </div>
        )
    }
}

export default Login;