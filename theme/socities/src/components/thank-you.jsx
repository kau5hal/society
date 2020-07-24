import React, { Component } from 'react'
import society from '../assets/society.jpeg'
import {Link} from 'react-router-dom';
import {getCookie} from '../functions/index'

class Thankyou extends Component {
    render() {
        return (
            <div className="">
                <div className="justify-content-center mx-auto w-75">
                    <div className="d-flex justify-content-center my-5">
                        <img src={society}/>
                    </div>
                    <div className="d-flex justify-content-center my-5">
                        <h2>Thank You for visitng {getCookie('socities_name')}</h2>
                    </div>
                    <div className="d-flex justify-content-center my-2">
                        <Link to="/main.html" className="btn w-100 btn-color">Okay</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Thankyou
