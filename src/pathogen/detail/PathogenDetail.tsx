import React from "react";
import {Badge, Col, Row, Jumbotron, ListGroup, ListGroupItem, Button} from "react-bootstrap";
import {useCollection, useDocument} from "react-firebase-hooks/firestore";
import firebase from "firebase/app";
import {useHistory, useRouteMatch} from "react-router";
import {Pathogen} from "../Pathogen";

interface PathogenDetailProps
{
  pathogen: Pathogen
}

const PathogenDetail = ({pathogen}: PathogenDetailProps) =>
{
  let history = useHistory();

  const getValueRow = (name: string, value: string) =>
  {
    if (!value) {
      return <></>
    }
    return (<>
      <dt className="col-sm-3 text-right">{name}</dt>
      <dd className="col-sm-9">{value}</dd>
    </>);
  };

  return (<>
    <Jumbotron className={"search-header"}>
      <h1>Pathogen Information</h1>
      <h2>{pathogen.commonName}</h2>
      <Button variant={'info'} onClick={() =>
      {
        history.push('/pathogens/' + pathogen.id + '/edit')
      }}>Edit this pathogen</Button>
    </Jumbotron>
    <Row>
      <h4>

        <dl className={'row'}>
          {getValueRow('Scientific Name', pathogen.scientificName)}
          {getValueRow('Family', pathogen.family)}
          {getValueRow('Viral Factor', pathogen.viralFactor.toString())}
          {getValueRow('Clinical Symptoms', pathogen.clinicalSymptoms)}
          {getValueRow('Family', pathogen.family)}
          {getValueRow('Created', pathogen.created.toLocaleString())}
          {getValueRow('Updated', pathogen.updated.toLocaleString())}

        </dl>

      </h4>

    </Row>


  </>

  );
}

export {PathogenDetail}
