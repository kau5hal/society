import React, { Component } from 'react'
import log_entry from '../assets/log_entry.png';
import log_exit from '../assets/log_exit.png';
import logout from '../assets/logout.png';
import view_log from '../assets/view_log.png'; 
import Header from './header'
import {getCookie,checkLogin} from '../functions/index'
import {Link} from 'react-router-dom'

class Main extends Component {
    componentDidMount = () => {
        checkLogin()
        .then(res => {
            if(res == false) this.props.history.push({pathname:'./login.html'})
        })
        .catch(err => {
            console.error(err);
        })
    }
    render() {
        return (
            <div>
                <Header data={`Hello ${getCookie('name')}`} />
                <div className="justify-content-center mx-auto w-75">
                <div className="d-flex justify-content-between my-3">
                    <div><Link to="/entry-log.html"><img src={log_entry} width="95px" height="95px"/></Link></div>
                    <div><Link to="/exit-log.html"><img src={log_exit} width="95px" height="95px"/></Link></div>
                </div>
                <div className="d-flex justify-content-between my-3">
                    <div><Link to="/logs.html"><img src={view_log} width="95px" height="95px"/></Link></div>
                    <div><Link to="/logout.html"><img src={logout} width="95px" height="95px"/></Link></div>
                </div>
            </div>
            </div>
        )
    }
}

export default Main
