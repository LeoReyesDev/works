import React, { Component } from 'react';
import './../css/App.css';
import style from './../css/style.css'
import LightBox from './LightBox'
import { TweenMax } from 'gsap'


let urlsPokemon = []
const endPoint = 'https://randomuser.me/api/?results=50'

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      postDiv: [],
      author:'',
      erasePost:'',
      singlePost:{
        id:'',
        title:'',
        authorPost:'',
        thumbnail:''
      },
        userID:{
          id:'',
          name:'',
          phone:'',
          email:'',
          picture:''

      },
      listUsers:[]

    }
  }

  componentDidMount() {
    this.openNav()
    this.listPokes()
  }

  /* [Click for load post inother div ================================== ♛ */

  targetId(i){

      this.setState({
         userID:{
           id:i,
           name:this.state.listUsers[0][i].name.first + " " +this.state.listUsers[0][i].name.last,
           phone:this.state.listUsers[0][i].phone,
           email:this.state.listUsers[0][i].email,
           picture:this.state.listUsers[0][i].picture.large

       }
     })
      this.showLightBox()
  }


  /* [OPEN SIDE BAR  ================================================== ♛ */

  openNav(){
      document.getElementById('mySidenav').style.width = "330px";
      console.log("OpenMenu")
      let barMenu = document.getElementById("barTitle")

      barMenu.style.display = "block"
      barMenu.style.opacity = 0;

      TweenMax.to(barMenu, 0.5, {opacity:1, delay:0.3})
      TweenMax.to('#allContent', 0.3, {opacity:1})
  }

  closeNav() {
      document.getElementById("mySidenav").style.width = "0";
      TweenMax.to('#barTitle', 0.1, {opacity:0, onComplete:noneDisplay})
      TweenMax.to('#allContent', 0.3, {opacity:0})
      function noneDisplay(){
        document.getElementById("barTitle").style.display = "none";
      }

  }
  /* [OPEN SIDE BAR  ================================================== ♛ */

  showLightBox(){
    document.getElementById("lightBox").style.display="flex"
  }
  hideLightBox(){
    document.getElementById("lightBox").style.display="none"
  }

  listPokes(){

    fetch(endPoint)
    .then(res=>res.json())
    .then(data=>{
      console.log("Data",data.results)
      this.state.listUsers.push(data.results)
      let registro = data.results.map((id,i) =>{
        //console.log("ID",i,id.name,id.phone,id.email)

           return(
             <div className="container-items" id={"item"+i} key={i}  onClick={this.targetId.bind(this,i)} >
               <div className="picture">
                 <img src={id.picture.large}/>
               </div>
                 <div className="dataRecord">
                   <div className="nameUser">{id.name.first} {id.name.last}</div>
                   <div className="streetUser">Address: 3356 argyle st City: vanier State: ontario</div>
                   <div className="phoneUser">Phone: {id.phone}</div>
                   <div className="emailUser">Email: {id.email}</div>
               </div>
             </div>
            )
      })
      this.setState({pokemonsAll:registro})
    })

  }


  render() {
    console.log("DATA",this.state.userID.name)
    return(

      <div id="container">
        <LightBox closeLightBox={this.hideLightBox.bind(this)} image={this.state.userID.picture} name={this.state.userID.name}
        phone={this.state.userID.phone} email={this.state.userID.email} />

        <div id="openCont">
          <ul>
            <li><span onClick={this.openNav.bind(this)} >&#9776;</span></li>
            <li><span onClick={this.openNav.bind(this)} >Open</span></li>
          </ul>
        </div>
        <div id="mySidenav" className="sidenav">
          <div id="barTitle">
          <h2>User List</h2>
          <a onClick={this.closeNav.bind(this)} className="closebtn">&times;</a>
          </div>
          <div id="allContent">
            {this.state.pokemonsAll}
          </div>
        </div>
      </div>

    )

  }
}

export default SideBar;