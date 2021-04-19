import React from 'react';
import './css/App.css';
import './css/bootstrap.min.css';
import firebase from "firebase/app";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Search} from "./views/search/Search";
import {CreatePage} from "./views/edit/CreatePage";
import {Container} from "react-bootstrap";
import {PathogenDetailPage} from "./views/detail/PathogenDetailPage";
import PathogenNavbar from "./PathogenNavbar";


//config for data access
const firebaseConfig = {
  apiKey: "AIzaSyCeLsJ_ZpNSGxlW80z0I2tbm0_tLJWXg9o", authDomain: "karius-technical-interview.firebaseapp.com", projectId: "karius-technical-interview", storageBucket: "karius-technical-interview.appspot.com", messagingSenderId: "49491905508", appId: "1:49491905508:web:dcdcbec31670ac93e9d5f1", measurementId: "G-Y5GC014CJH"
};

firebase.initializeApp(firebaseConfig);


//top level routing lives here
function App()
{
  return (<>
    <BrowserRouter>
      <PathogenNavbar/>
      <div className={"main-content"}>
        <Container className={"top-container"}>
          <Switch>
            <Route path="/" exact component={Search}/>
            <Route path="/create" exact component={CreatePage}/>
            <Route path="/pathogens/:pathogenID" component={PathogenDetailPage}/>
          </Switch>
        </Container>
      </div>
    </BrowserRouter>

  </>);
}

export default App;
