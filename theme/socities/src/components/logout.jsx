import React, { Component } from 'react'
import {deleteAllCookies} from '../functions/index';

class Logout extends Component {
   async componentDidMount(){
       await deleteAllCookies();
        this.props.history.push({pathname:'./login.html'})
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Logout
