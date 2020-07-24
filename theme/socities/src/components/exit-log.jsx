import React, { Component } from "react";
import axios from "axios";
import { localhost } from "../constants/index";
import { setCookie, getCookie,checkLogin } from "../functions/index";
import Header from './header'
// import QrReader from "react-qr-reader";
import QrcodeDecoder from 'qrcode-decoder';
var qr = new QrcodeDecoder();
class ExitLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      society_details: null,
    };
  }
  componentDidMount() {
    console.log(getCookie("society_id"));
    checkLogin()
        .then(res => {
            if(res == false){
                this.props.history.push({pathname:'./login.html'})
            } else{
                axios
                .post(
                  `${localhost}api/get-barcode`,
                  {
                    society_id: getCookie("society_id"),
                  //   society_id: 1,
                  },
                  {
                    headers: { "Content-type": "application/json" },
                  }
                )
                .then((res) => {
                  console.log(res);
                  if (res.data.statusId == 1) {
                    this.setState({ society_details: res.data.res[0] });
                    var inter = setInterval(function(){
                      console.log('interval');
                      var img = document.getElementById('barcode');
                      console.log(img);
                      qr.decodeFromImage(img).then((res) => {
                          axios
                          .post(
                            `${localhost}api/log/exit`,
                            {
                              society_id: getCookie("society_id"),
                              user_id: getCookie("user_id")
                            },
                            {
                              headers: { "Content-type": "application/json" },
                            }
                          )
                          .then((res) => {
                            console.log(res);
                            // if (res.data.statusId == 1) {
                             
                            // }
                            window.location.href="./thank-you.html"
                          })
                          .catch((err) => {
                            console.error(err);
                          });
                      });
                      clearInterval(inter);
                    },2000)
                  }
                  // else{
          
                  // }
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
  handleScan = (data) => {
      console.log(data);
    if (data) {
      this.setState({
        result: data,
      });
    }
  };
  handleError = (err) => {
    console.error(err);
  };
  render() {
    return (
      <div>
          <Header data={'Log Exit'} />
        <div className="justify-content-center mx-auto w-75 my-5">
          {this.state.society_details !== null &&
          this.state.society_details.barcode != null &&
          this.state.society_details.barcode != "" ? (
              <>
              {/* <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: "100%" }}
            value={this.state.society_details.barcode}
          /> */}
          {/* <p>{this.state.result}</p> */}
          <div className="d-flex justify-content-center">
              <img
                src={this.state.society_details.barcode}
                id="barcode"
                className=""
                width="200px"
                height="200px"
              />
            </div>
              </>
          
          ) : (
            ""
          )}
          
        </div>
      </div>
    );
  }
}

export default ExitLog;
