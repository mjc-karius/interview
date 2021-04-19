import React from "react";
import {Jumbotron} from "react-bootstrap";
import {useDocument} from "react-firebase-hooks/firestore";
import firebase from "firebase/app";
import {useRouteMatch} from "react-router";
import {Pathogen} from "../../pathogens/Pathogen";
import {PathogenDetail} from "./PathogenDetail";
import {EditPathogen} from "../edit/EditPathogen";



//top level detail page component for displaying and editing information about a single pathogen.

const PathogenDetailPage = () =>
{
  const match = useRouteMatch('/pathogens/:pathogenID/:component?');
  // @ts-ignore - skipping defining param types for this detail for now in order to keep moving.
  const {pathogenID, component}: string = match.params;

  const query = firebase.firestore().collection('pathogens').doc(pathogenID);
  const [pathogenRef, loading, error] = useDocument(query)


  return (<>
    {pathogenRef && component === "edit" ? <EditPathogen pathogen={Pathogen.fromFirestore(pathogenRef)}/> : <PathogenDetail pathogen={Pathogen.fromFirestore(pathogenRef)}/>}
    {error && (<Jumbotron className={"search-header"}>
      <h1> Pathogen Management System - Error</h1>
      <h2>{JSON.stringify(error)}</h2>
    </Jumbotron>)}


  </>

  );
}

export {
  PathogenDetailPage
}
