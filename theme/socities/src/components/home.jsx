import React, { Component } from 'react'
import society from '../assets/society.jpeg'
import {Link} from 'react-router-dom'
import Header from './header'
import {checkLogin} from '../functions/index'

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    componentDidMount(){
        checkLogin()
            .then(res => {
                if (res == true) this.props.history.push({pathname:'./main.html'})
            })
                .catch(err => {
                    console.error(err);
                })
    }
    render() {
        return (
            <div>
                <Header data={'Home'}/>
                <div className="justify-content-center mx-auto w-50">
                <div className="d-flex justify-content-center my-5">
                    <img src={society}/>
                </div>
                <div className="d-flex justify-content-center my-2">
                    {/* <button className="btn w-100 btn-color">Register</button> */}
                    <Link to="/register.html" className="btn w-100 btn-color">Register</Link>
                </div>
                <div className="d-flex justify-content-center my-2">
                    <Link to="/login.html" className="btn w-100 btn-color">Login</Link>
                </div>
            </div>
            </div>
            
        )
    }
}

export default Home
