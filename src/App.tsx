import React from 'react';
import './App.css';
import './bootstrap.min.css';
import firebase from "firebase/app";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Search} from "./Search";
import {Create} from "./Create";
import {Container} from "react-bootstrap";

const firebaseConfig = {
  apiKey: "AIzaSyCeLsJ_ZpNSGxlW80z0I2tbm0_tLJWXg9o", authDomain: "karius-technical-interview.firebaseapp.com", projectId: "karius-technical-interview", storageBucket: "karius-technical-interview.appspot.com", messagingSenderId: "49491905508", appId: "1:49491905508:web:dcdcbec31670ac93e9d5f1", measurementId: "G-Y5GC014CJH"
};

firebase.initializeApp(firebaseConfig);

function App()
{
  return (<Container fluid>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Search}></Route>
        <Route path="/create" exact component={Create}></Route>
      </Switch>
    </BrowserRouter>
  </Container>);
}

export default App;
