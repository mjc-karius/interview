import React, {useState} from "react";
import {Pathogen} from "../../pathogens/Pathogen"
import {useFormik} from "formik";
import * as yup from "yup";
import {Button, Col, Form} from "react-bootstrap";
import {useHistory} from "react-router";
import Creatable from 'react-select/creatable';
import {SequenceFileInput} from "./SequenceFileInput";

interface EditPathogenProps
{
  pathogen: Pathogen | null
}

//the edit or create component for pathogens. If a pathogen is passed to this component, it will edit that one. If not, a new one will be created.
const EditPathogen = ({pathogen}: EditPathogenProps) =>
{


  const initialPathogen = pathogen ? pathogen : new Pathogen();
  const initialValues = {...initialPathogen, sequence: ""};
  const [sequence, setSequence] = useState<string>();

  let history = useHistory();

  const makeOptions = (path: Pathogen) =>
  {
    return path.tags.map((tag) =>
    {
      return {value: tag, label: tag}
    })
  }
  const [options, setOptions] = useState(makeOptions(initialPathogen));

  //basic schema for a few fields only defined. I was not sure the real validation requirements, and did not apply validation to the sequence due to time constraints.
  const validationSchema = yup.object().shape({
    commonName: yup.string().required("Common Name is required"), scientificName: yup.string().required("Scientific Name is required"), family: yup.string().required("Family is required"), viralFactor: yup.number().required("Viral Factor is required"),
  });


  const {errors, touched, ...formik} = useFormik({
    initialValues, validationSchema: validationSchema, onSubmit: async (values, {setSubmitting}) =>
    {
      //process user entries
      let pathogenID = pathogen ? pathogen.id : "";
      const tags = options.map(opt => opt.value) as [string];
      console.log('tags:', tags)
      if (!pathogen) { // creation
        const newPathogen = Pathogen.fromUserData(values.commonName || '', values.scientificName || '', values.family || '', values.viralFactor, values.clinicalSymptoms || '', tags, sequence ? sequence : "" || '');
        await newPathogen.persist();
        pathogenID = newPathogen.id;
        console.log('creation', values);
      }
      else { //editing existing
        pathogen.commonName = values.commonName;
        pathogen.scientificName = values.scientificName;
        pathogen.family = values.family;
        pathogen.viralFactor = values.viralFactor;
        pathogen.clinicalSymptoms = values.clinicalSymptoms;
        pathogen.tags = tags
        await pathogen.persist();
      }

      setSubmitting(false);
      history.push('/pathogens/' + pathogenID);

    },
  });


  // @ts-ignore
  return (<>


    <Form onSubmit={formik.handleSubmit}>
      <br/>

      <Form.Row>
        <Form.Group as={Col} xs={12} controlId="common-name">
          <Form.Label>Common Name</Form.Label>
          <Form.Control
          type="text"
          name="commonName"
          value={formik.values.commonName}
          onChange={formik.handleChange}
          placeholder="Common Name"
          isInvalid={!!errors.commonName && !!touched.commonName}
          />
          <Form.Control.Feedback type="invalid">{errors.commonName}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs={12} sm={6} md={4} controlId="scientificName">
          <Form.Label>Scientific Name</Form.Label>
          <Form.Control
          type="text"
          name="scientificName"
          value={formik.values.scientificName}
          onChange={formik.handleChange}
          placeholder="Scientific Name"
          isInvalid={!!errors.scientificName && !!touched.scientificName}
          />
          <Form.Control.Feedback type="invalid">{errors.scientificName}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs={12} sm={6} md={4} controlId="family">
          <Form.Label>Family</Form.Label>
          <Form.Control
          type="text"
          name="family"
          value={formik.values.family}
          onChange={formik.handleChange}
          placeholder="Family"
          isInvalid={!!errors.family && !!touched.family}
          />
          <Form.Control.Feedback type="invalid">{errors.family}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs={12} sm={6} md={4} controlId="viralFactor">
          <Form.Label>Viral Factor</Form.Label>
          <Form.Control
          type="number"
          name="viralFactor"
          value={formik.values.viralFactor}
          onChange={formik.handleChange}
          placeholder="Viral Factor"
          isInvalid={!!errors.viralFactor && !!touched.viralFactor}
          />

          <Form.Control.Feedback type="invalid">{errors.viralFactor}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs={12} controlId="sequence">
          <Form.Label>Tags</Form.Label>
          <Creatable options={makeOptions(initialPathogen)} isMulti onChange={(option) =>
          {
            // @ts-ignore
            setOptions(option);
          }}/>
          <Form.Control.Feedback type="invalid">{errors.sequence}</Form.Control.Feedback>
        </Form.Group>

        {!pathogen && (<SequenceFileInput setSequenceCallback={setSequence}/>)}

      </Form.Row>

      <Button
      disabled={formik.isSubmitting}
      variant="primary"
      type="submit"
      onClick={() =>
      {
        formik.handleSubmit();
      }}
      >
        Save
      </Button>
    </Form>
  </>)
}

export {EditPathogen}
