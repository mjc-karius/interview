import React, {useState} from "react";
import {Badge, Col, FormControl, FormLabel, Jumbotron, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {Pathogen} from "../../pathogens/Pathogen";
import {useCollection} from "react-firebase-hooks/firestore";
import firebase from "firebase/app";
import {useHistory} from "react-router";
import {SequenceFileInput} from "../edit/SequenceFileInput";

const sha1 = require('sha1');


const Search = () =>
{
  let history = useHistory();
  const query = firebase.firestore().collection('pathogens');
  const [nameFilter, setNameFilter] = useState<string>("");
  const [sequenceFilter, _setSequenceFilter] = useState<string>("");

  const setSequenceFilter = (filter: string) =>
  {
    const seq = sha1(filter);
    _setSequenceFilter(seq);
  }

  const [pathogens, loading, error] = useCollection(query);


  const pathogenMatchesFilter = (pathogen: Pathogen) =>
  {
    const sequenceMatch = !sequenceFilter || pathogen.sequenceSHA1 === sequenceFilter;
    const nameMatch = !nameFilter || pathogen.commonName.toLowerCase().includes(nameFilter.toLowerCase());
    return nameMatch && sequenceMatch;


  }


  const rowForPathogen = (pathogen: Pathogen) =>
  {

    if (!pathogenMatchesFilter(pathogen)) return <></>
    return (<ListGroupItem className={"views-search-result"} onClick={() =>
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
    <Row>
      <Col><h4>Filter Pathogens</h4></Col>
    </Row>
    <Row>

      <Col className="">
        <FormLabel>
          Filter By Common Name:
        </FormLabel>
        <FormControl
        id="search"
        placeholder="Name"
        onChange={(e) =>
        {
          setNameFilter(e.target.value.trim());
        }}
        />
      </Col>

      <Col>
        <SequenceFileInput setSequenceCallback={setSequenceFilter}/>
      </Col>
    </Row>
    <ListGroup className={'search-results'}>
      {pathogens && React.Children.toArray(pathogens.docs.map(pathogen => rowForPathogen(Pathogen.fromFirestore(pathogen))))}
      {error && <h3>Error {JSON.stringify(error)}</h3>}

    </ListGroup>
  </>

  );
}

export {Search}
