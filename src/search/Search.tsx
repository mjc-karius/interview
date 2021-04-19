import React from "react";
import {Badge, Row, Col, Jumbotron, ListGroup, ListGroupItem} from "react-bootstrap";
import {Pathogen} from "../pathogen/Pathogen";
import {useCollection} from "react-firebase-hooks/firestore";
import firebase from "firebase/app";
import {useHistory} from "react-router";


const Search = () =>
{
  let history = useHistory();
  const query = firebase.firestore().collection('pathogens');
  const [pathogens, loading, error] = useCollection(query);


  const rowForPathogen = (pathogen: Pathogen) =>
  {
    return (<ListGroupItem className={"pathogen-search-result"} onClick={() =>
    {
      history.push('/pathogens/' + pathogen.id);
    }}>
      <Col xs={12}>

        <Row>
          <Col><h5>{pathogen.commonName}</h5></Col>
        </Row>
        <Row>
          <Col><span><strong>Scientific Name: </strong>{pathogen.scientificName}</span> </Col>
          <Col><h5><Badge variant={"primary"}>Family: {pathogen.family}</Badge></h5></Col>
        </Row>


      </Col>
    </ListGroupItem>);


  }

  return (<>
    <Jumbotron className={"search-header"}>
      <h1> Pathogen Management System</h1>
    </Jumbotron>
    <ListGroup>
      {pathogens && React.Children.toArray(pathogens.docs.map(pathogen => rowForPathogen(Pathogen.fromFirestore(pathogen))))}
      {error && <h3>Error {JSON.stringify(error)}</h3>}

    </ListGroup>
  </>

  );
}

export {Search}
