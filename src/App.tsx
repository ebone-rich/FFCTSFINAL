import React, { useState } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
// import { AppState } from "../App";
// import Login from "./auth/Login";
//import Signup from "./auth/Signup";
import Home from "./home/Home";
import APIURL from "./helpers/environments";
import Auth from "./auth/Auth";
import CreatePets from "./pets/CreatePets";



class App extends React.Component {
  tokenUpdate = () => {
    
  }

  clearToken = () => {
    
  }

    toggleFunc = () => {
    }

  render() { 
    return ( 
     <BrowserRouter>
      <Routes>

      <Route path="/auth" element={<Auth toggleFunc={this.toggleFunc}tokenUpdate={this.tokenUpdate} clearToken={this.clearToken}>

        </Auth>} />
        <Route path="/" element={<Home />}></Route>
        <Route path="/create-pets" element={<CreatePets />}></Route>

      </Routes>
      </BrowserRouter> 
    )
  }
} 
export default App;