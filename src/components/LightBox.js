import React, { Component } from 'react';
import './../css/App.css';
import style from './../css/style.css'



class LightBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      }
    }

  render() {
    return(

      <div id="lightBox">
        <div className="userBox" >
          <div class="closeX" onClick={this.props.closeLightBox}>close X</div>
          <img className="picture" src={this.props.image}/>
          <div className="Title">
            <h1>{this.props.name}</h1>
          </div>
          <div className="Title">
            Phone: {this.props.phone}
          </div>
          <div className="Title">
            Email: {this.props.email}
          </div>
        </div>
      </div>
    )
  }
}

export default LightBox;