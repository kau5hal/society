import React, { Component } from 'react'

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <div className="container primary-background-color header">
                    <h6 className="text-white h4">{this.props.data ? this.props.data : 'Home' }</h6>
                </div>
            </div>
        )
    }
}

export default Header
