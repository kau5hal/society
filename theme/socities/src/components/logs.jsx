import React, { Component } from 'react'
import Header from './header';
import axios from 'axios';
import { getCookie,checkLogin } from '../functions';
import { localhost } from "../constants/index";
import $ from 'jquery';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Logs extends Component {
    constructor(props){
        super(props);
        this.state ={
            entry_log:null,
            exit_log:null,
            active:0,
            startDate:"",
            endDate:""
        }
    }
    componentDidMount(){
        checkLogin()
        .then(res => {
            if(res == false){
                this.props.history.push({pathname:'./login.html'})
            }else{
                axios
              .post(
                `${localhost}api/getlog`,
                {
                    user_id:getCookie('user_id')
                },
                {
                  headers: { "Content-type": "application/json" },
                }
              )
              .then((res) => {
                if(res.data.statusId == 1){
                  console.log(res);
                    var entry_log = res.data.res.filter((res,i)=>res.log_details == 0);
                    var exit_log = res.data.res.filter((res,i)=>res.log_details == 1);
                    this.setState({
                        entry_log:entry_log,
                        exit_log:exit_log
                    })
                    let search = window.location.search;
                    let params = new URLSearchParams(search);
                    if(params.get('log') == 0){
                        this.showEntries()
                    }else if(params.get('log') == 1){
                        this.showExits()
                    }else{
                        this.showEntries()
                    }
                }else{
                }
              })
              .catch((err) => {
                console.error(err);
              });
            } 
        })
        .catch(err => {
            console.error(err);
        })
        
    }
    getTime = (datetime) =>{
        var date = new Date(datetime);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    showEntries = () => {
        $('#child_exit_logs').addClass('d-none');
        $('#child_entry_logs').removeClass('d-none');
        this.setState({active:0})
    }
    showExits = () => {
        $('#child_exit_logs').removeClass('d-none');
        $('#child_entry_logs').addClass('d-none');
        this.setState({active:1})
    }
    startDate = date => {
        // console.log(date);
        var date = new Date(date);
        // console.log(date.getDate(),date.getMonth(),date.getFullYear())
        this.setState({
          startDate: date
        });
      }; 
    endDate = date => {
        // console.log(date);
        this.setState({
          endDate: date
        });
        
        if(this.state.startDate != '' && date != ''){
            var start_date = `${this.state.startDate.getFullYear()}-${('0' + parseInt(this.state.startDate.getMonth()+1)).slice(-2)}-${('0' + this.state.startDate.getDate()).slice(-2)}`;
            var end_date = `${date.getFullYear()}-${('0' + parseInt(date.getMonth()+1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
            console.log(start_date,end_date);
            axios
              .post(
                `${localhost}api/getfilterdata`,
                {
                    user_id:getCookie('user_id'),
                    start_date:start_date,
                    end_date:end_date
                },
                {
                  headers: { "Content-type": "application/json" },
                }
              )
              .then((res) => {
                if(res.data.statusId == 1){
                  console.log(res);
                    var entry_log = res.data.res.filter((res,i)=>res.log_details == 0);
                    var exit_log = res.data.res.filter((res,i)=>res.log_details == 1);
                    this.setState({
                        entry_log:entry_log,
                        exit_log:exit_log
                    })
                    let search = window.location.search;
                    let params = new URLSearchParams(search);
                    if(params.get('log') == 0){
                        this.showEntries()
                    }else if(params.get('log') == 1){
                        this.showExits()
                    }else{
                        this.showEntries()
                    }
                }else{
                }
              })
              .catch((err) => {
                console.error(err);
              });
        }
    };   
    render() {
        // console.log(this.state);
        const ColoredLine = ({ color }) => (
            <hr
                style={{
                    color: color,
                    backgroundColor: color,
                    height: 2,
                    marginTop:0,
                    marginBottom:0,
                    width:78
                }}
            />
        );
        return (
            <div>
                <Header data={'Logs'}/>
                <div className="d-flex justify-content-around primary-background-color p-2">
                    <div className="m-1">
                        <DatePicker
                        id="start-date"
                        selected={this.state.startDate}
                        placeholder={`End Date`}
                        onChange={this.startDate}
                        />
                    </div>
                    <div className="m-1">
                       <DatePicker
                        id="end-date"
                        selected={this.state.endDate}
                        onChange={this.endDate}
                        placeholder={`start date`}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-around primary-background-color p-2">
                    <div>
                        <span onClick={this.showEntries} id="entries" className="text-white h4 p-2 cursor-pointer">Entries</span>
                        {this.state.active == 0 ? <ColoredLine color="#ffffff" /> : ''}
                    </div>
                    <div>
                        <span onClick={this.showExits} id="exist" className="text-white h4 p-2 cursor-pointer">Exits</span>
                        {this.state.active == 1 ? <ColoredLine color="#ffffff" /> : ''}
                    </div>
                </div>
                <div>
                    <div className="child_entry_logs" id="child_entry_logs">
                        {
                            this.state.entry_log !== null && this.state.entry_log.length > 0
                            ?
                                this.state.entry_log.map((datum,key)=>
                                    <div className="justify-content-between d-flex box mx-1 my-2 align-items-center">
                                        <div className="">
                                            <h4 className="m-0 p-0">{datum.name}</h4>
                                            <h5 className="m-0 p-0">{datum.socities_name}</h5>
                                        </div>
                                        <div className="">
                                            {this.getTime(datum.sysdate)}
                                        </div>
                                    </div>
                                )
                            : <div>
                            <h1>No data Found</h1>
                            </div>
                        }
                    </div>
                    <div className="child_exit_logs" id="child_exit_logs">
                        {
                            this.state.exit_log !== null && this.state.exit_log.length > 0
                            ?
                                this.state.exit_log.map((datum,key)=>
                                    <div className="justify-content-between d-flex box mx-1 my-2 align-items-center">
                                        <div className="">
                                            <h4 className="m-0 p-0">{datum.name}</h4>
                                            <h5 className="m-0 p-0">{datum.socities_name}</h5>
                                        </div>
                                        <div className="">
                                            {this.getTime(datum.sysdate)}
                                        </div>
                                    </div>
                                )
                            : <div>
                                <h1>No data Found</h1>
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Logs;
