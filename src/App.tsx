import React from 'react';
import './css/App.css';
import './css/bootstrap.min.css';
import firebase from "firebase/app";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Search} from "./search/Search";
import {CreatePage} from "./edit/CreatePage";
import {Container} from "react-bootstrap";
import {PathogenDetailPage} from "./pathogen/detail/PathogenDetailPage";
import PathogenNavbar from "./PathogenNavbar";

const firebaseConfig = {
  apiKey: "AIzaSyCeLsJ_ZpNSGxlW80z0I2tbm0_tLJWXg9o", authDomain: "karius-technical-interview.firebaseapp.com", projectId: "karius-technical-interview", storageBucket: "karius-technical-interview.appspot.com", messagingSenderId: "49491905508", appId: "1:49491905508:web:dcdcbec31670ac93e9d5f1", measurementId: "G-Y5GC014CJH"
};

firebase.initializeApp(firebaseConfig);

function App()
{
  return (<>
    <BrowserRouter>

      <PathogenNavbar/>
      <Container>
        <Switch>
          <Route path="/" exact component={Search}/>
          <Route path="/create" exact component={CreatePage}/>
          <Route path="/pathogens/:pathogenID" component={PathogenDetailPage}/>
        </Switch>
      </Container>
    </BrowserRouter>

  </>);
}

export default App;
