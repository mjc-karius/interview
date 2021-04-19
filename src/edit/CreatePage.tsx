import React from "react";
import {Pathogen} from "../pathogen/Pathogen"
import {useFormik} from "formik";
import * as yup from "yup";
import {Button, Col, Form, Jumbotron} from "react-bootstrap";
import {EditPathogen} from "./EditPathogen";


const CreatePage = () =>
{
  let pathogen = new Pathogen();


  return (<>
    <Jumbotron>
      <h1>Enter a New Pathogen</h1>
    </Jumbotron>
    <EditPathogen pathogen={pathogen}></EditPathogen>


  </>)
}

export {CreatePage}
