import React from "react";
import {Button, Col, Jumbotron, Row} from "react-bootstrap";
import {useHistory} from "react-router";
import {Pathogen} from "../../pathogens/Pathogen";

interface PathogenDetailProps
{
  pathogen: Pathogen
}

//detail view for a pathogen, componentized so the detail page can choose between this and the edit component.
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
      <Col>
        <h4>

          <dl className={'row'}>
            {getValueRow('Scientific Name', pathogen.scientificName)}
            {getValueRow('Family', pathogen.family)}
            {getValueRow('Viral Factor', pathogen.viralFactor.toString())}
            {getValueRow('Clinical Symptoms', pathogen.clinicalSymptoms)}
            {getValueRow('Tags', "'" + pathogen.tags.join("',  '") + "'")}
            {getValueRow('Sequence Length', pathogen.sequenceLength.toString())}
            {getValueRow('Created', pathogen.created.toLocaleString())}
            {getValueRow('Updated', pathogen.updated.toLocaleString())}

          </dl>

        </h4>
      </Col>

    </Row>


  </>

  );
}

export {PathogenDetail}
