import React, { Component } from 'react'
import SimpleReactValidator from "simple-react-validator";
import NumberFormat from "react-number-format";
import axios from "axios";
import Select from "react-select";
import { localhost } from "../constants/index";
import $ from 'jquery';
import {setCookie,getCookie,checkLogin} from '../functions/index';
import Header from './header'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          mobile: "",
          password: "",
        };
        this.userLogin = this.userLogin.bind(this);
        this.validator = new SimpleReactValidator();
      }
      setStateFromInput = async (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        await this.setState(obj);
      };
      userLogin = (e) => {
        this.setState({
          addNotValid: 0,
        });
        e.preventDefault();
        if (this.validator.allValid()) {
            axios
              .post(
                `${localhost}api/login`,
                {
                  mobile: this.state.mobile,
                  pass: this.state.password,
                },
                {
                  headers: { "Content-type": "application/json" },
                }
              )
              .then((res) => {
                // console.log(res);
                if(res.data.statusId == 1){
                  console.log(res);
                  setCookie('user_id',res.data.res.id,1);
                  setCookie('society_id',res.data.res.socities_id,1); 
                  setCookie('name',res.data.res.name,1); 
                  setCookie('socities_name',res.data.res.socities_name,1);
                  setCookie('socities_area',res.data.res.socities_area,1);
                  setCookie('socities_city',res.data.res.socities_city,1);
                this.props.history.push({pathname:'./main.html'})
                }else{
                    $('#error').removeClass('d-none').html(res.data.msg);
                }
              })
              .catch((err) => {
                console.error(err);
              });
        } else {
          this.validator.showMessages();
        }
      };
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
        // console.log(this.state);
        return (
          <div>
            <Header data={'Login'} />
            <div className="justify-content-center mx-auto w-75">
              <form className="my-3" onSubmit={this.userLogin}>
              <div className="w-100 d-none bg-success text-white text-center p-2" id="success"></div>
              <div className="w-100 d-none bg-error text-white text-center p-2 my-2" id="error"></div>
                <div className="my-3">
                  <NumberFormat
                    id="mobile"
                    placeholder="Mobile Number"
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
                <div className="my-3">
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="form-control p-1"
                    onChange={this.setStateFromInput}
                    value={this.state.password}
                  />
                  {this.validator.message(
                    "Password",
                    this.state.password,
                    `required|string`
                  )}
                </div>
                <div className="my-3 text-center">
                  <button type="submit" className="btn btn-color w-100 text-white">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
    }
}

export default Login
