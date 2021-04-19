import React from "react";
import {Jumbotron} from "react-bootstrap";
import {EditPathogen} from "./EditPathogen";

//top level page that hosts an EditPathogen component to allow users to make new ones. 
const CreatePage = () =>
{
 return (<>
    <Jumbotron>
      <h1>Enter a New Pathogen</h1>
    </Jumbotron>
    <EditPathogen pathogen={null}></EditPathogen>


  </>)
}

export {CreatePage}
