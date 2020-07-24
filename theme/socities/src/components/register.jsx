import React, { Component } from "react";
import SimpleReactValidator from "simple-react-validator";
import NumberFormat from "react-number-format";
import axios from "axios";
import Select from "react-select";
import { localhost } from "../constants/index";
import {getCookie,setCookie,checkLogin} from '../functions/index';
import $ from 'jquery';
import Header from './header'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mobile: "",
      password: "",
      confirm_password: "",
      addNotValid: "",
      defaultOptions: [{ label: "Sheetal Chaya", value: 1 }],
      options: [
        { label: "Sheetal Chaya", value: 1 },
        { label: "Geeta Nagar", value: 2 },
        { label: "Balaji Complex", value: 3 },
        { label: "Salasar Bridge Bummi", value: 4 },
      ],
      society: 1,
    };
    this.validator = new SimpleReactValidator();
    this.userRegister = this.userRegister.bind(this);
    this.onChangeSociety = this.onChangeSociety.bind(this);
  }
  userRegister = (e) => {
    this.setState({
      addNotValid: 0,
    });
    e.preventDefault();
    if (this.validator.allValid()) {
      if (this.state.password === this.state.confirm_password) {
        axios
          .post(
            `${localhost}api/register`,
            {
              name: this.state.name,
              mobile: this.state.mobile,
              society_id: this.state.society,
              pass: this.state.password,
            },
            {
              headers: { "Content-type": "application/json" },
            }
          )
          .then((res) => {
            // console.log(res);
            if(res.data.statusId == 1){
                // setCookie('user_id','1',1);
                // setCookie('society_id','1',1); 
                console.log(res);
                 setCookie('user_id',res.data.res.id,1);
                  setCookie('society_id',res.data.res.socities_id,1); 
                  setCookie('name',res.data.res.name,1); 
                  setCookie('socities_name',res.data.res.socities_name,1);
                  setCookie('socities_area',res.data.res.socities_area,1);
                  setCookie('socities_city',res.data.res.socities_city,1);
                // this.props.history.push({pathname:'./main.html'})
                this.props.history.push({pathname:'./mobile-verify.html'})
            }else{
                $('#error').removeClass('d-none').html(res.data.msg);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        $('#error').removeClass('d-none').html('Password should be same');
      }
    } else {
      this.validator.showMessages();
    }
  };
  onChangeSociety = (event) => {
    // console.log(event.target,event);
    this.setState({ society: event.value });
  };
  setStateFromInput = async (event) => {
    var obj = {};
    obj[event.target.name] = event.target.value;
    await this.setState(obj);
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
    const InputProps = {
      required: true,
    };
    return (
      <div>
        <Header data={'Register'}/>
        <div className="justify-content-center mx-auto w-75">
        <form className="my-3" onSubmit={this.userRegister}>
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
              id="name"
              type="text"
              placeholder="Name"
              name="name"
              className="form-control p-1"
              onChange={this.setStateFromInput}
              value={this.state.name}
            />
            {this.validator.message("Name", this.state.name, `required|string`)}
          </div>
          <div className="my-3">
            <Select
              isOptionSelected="true"
              options={this.state.options}
              headingProps={InputProps}
              placeholder={"Select Society"}
              onChange={this.onChangeSociety.bind(this)}
              defaultValue={this.state.defaultOptions}
            />
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
          <div className="my-3">
            <input
              id="confirm_password"
              type="password"
              placeholder="Confirm Password"
              name="confirm_password"
              className="form-control p-1"
              onChange={this.setStateFromInput}
              value={this.state.confirm_password}
            />
            {this.validator.message(
              "confirm_password",
              this.state.confirm_password,
              `required|string`
            )}
          </div>
          <div className="my-3 text-center">
            <button type="submit" className="btn btn-color w-100 text-white">
              Submit
            </button>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

export default Register;
