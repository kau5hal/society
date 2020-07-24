import React, { Component } from 'react'
import Header from './header';
import SimpleReactValidator from "simple-react-validator";
import NumberFormat from "react-number-format";
import axios from "axios";
import {localhost} from '../constants/index'
import { getCookie } from '../functions';
import $ from 'jquery';
import {Link} from 'react-router-dom';

class MobileVerify extends Component {
    constructor(props) {
        super(props);
        this.state = {
          mobile: ""
        };
        this.validator = new SimpleReactValidator();
        this.onSubmit = this.onSubmit.bind(this);
      }
      onSubmit = (e) => {
          e.preventDefault();
        axios
              .post(
                `${localhost}api/verify-otp`,
                {
                    user_id: getCookie('user_id'),
                    otp:this.state.mobile,
                },
                {
                  headers: { "Content-type": "application/json" },
                }
              )
              .then((res) => {
                console.log(res);
                if(res.data.statusId == 1){
                    console.log('if');
                    if(res.data.res[0].status == 'success'){
                        this.props.history.push({pathname:'./main.html'})
                        // console.log('if if');
                    }else{
                        // console.log('if else');
                        $('#error').removeClass('d-none').html(res.data.res[0].msg);
                    }
                }else{
                }
              })
              .catch((err) => {
                console.error(err);
              });
      }
      setStateFromInput = async (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        await this.setState(obj);
      };
    render() {
        console.log(this.state);
        return (
            <div>
                <Header data={'Mobile Verification'}/>
                <div className="justify-content-center mx-auto w-75">
                    <form onSubmit={this.onSubmit}>
                    <div className="w-100 d-none bg-success text-white text-center p-2" id="success"></div>
                    <div className="w-100 d-none bg-error text-white text-center p-2 my-2" id="error"></div>
                    <div className="my-3">
                        <NumberFormat
                            id="mobile"
                            placeholder="Verification code"
                            name="mobile"
                            className="form-control p-1"
                            onChange={this.setStateFromInput}
                            value={this.state.mobile}
                        />
                        {this.validator.message(
                            "Mobile",
                            this.state.mobile,
                            `required|string`
                        )}
                        </div>
                        <div className="d-flex justify-content-center my-2">
                            <button type="submit" className="btn btn-color w-100 text-white">
                                Submit
                            </button>
                        </div>
                        <div className="d-flex justify-content-end my-2">
                            <span className="mx-1">Resend OTP</span>
                            <Link className="mx-1" to={'/main.html'}>Skip</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default MobileVerify
