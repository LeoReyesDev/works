import React, { Component } from 'react';
import './../css/App.css';
import style from './style.css'
import UserScreen from './UserScreen'
import { TweenMax } from 'gsap'


let urlsPokemon = []

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
          email:''

      },
      listUsers:[]

    }
  }

  componentDidMount() {
    this.openNav()
    this.listPokes()
  }

  /* [Click for load post inother div ================================== ♛ */

  handleClick(n,p,e){

     this.showLightBox()
     this.setState({
        userID:{
          name:n,
          phone:p,
          email:e
      }
    })
     console.log(" [----- POST -----] ", this.state.userID)

  }

  targetId(i){
     // console.log("ID: ",i)
     // console.log("Name",this.state.listUsers[0][i].name.first)
     // console.log("Phone",this.state.listUsers[0][i].phone)
     // console.log("Email",this.state.listUsers[0][i].email)

      this.setState({
         userID:{
           name:this.state.listUsers[0][i].name.first,
           phone:this.state.listUsers[0][i].phone,
           email:this.state.listUsers[0][i].email
       }
     })
      this.showLightBox()
  }

  /* [Delete Posts in SideBar ========================================= ♛ */

  dismissClick(id,e){
    console.log("ID: ",e.target.value,"ERASE: ", this.state.erasePost)
    let myDiv = "post" + e.target.value
    document.getElementById(myDiv).style.display="none"
    this.clearPost()
  }

  /* [Delete Posts in SideBar ========================================= ♛ */

  clearPost(){
    console.log('clear')
    this.setState({
       singlePost: {
         id:'',
         title:'',
         authorPost:'',
         thumbnail:''
       }
     })
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

    fetch('https://randomuser.me/api/?results=100')
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
      <div id="lightBox">
        <div className="userBox" onClick={this.hideLightBox.bind(this)}>
          <h1>{this.state.userID.name}</h1>
          <h2>{this.state.userID.phone}</h2>
          <p>{this.state.userID.email}</p>
        </div>
      </div>
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
     {/*   <UserScreen
            thumbnail={this.state.singlePost.thumbnail}
            authorPost={this.state.singlePost.authorPost}
            title={this.state.singlePost.title}
        />*/}
      </div>

    )

  }
}

export default SideBar;