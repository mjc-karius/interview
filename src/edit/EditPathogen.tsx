import React from "react";
import {Pathogen} from "../pathogen/Pathogen"
import {useFormik} from "formik";
import * as yup from "yup";
import {Button, Col, Form} from "react-bootstrap";
import {useHistory} from "react-router";


interface EditPathogenProps
{
  pathogen: Pathogen | null
}

const EditPathogen = ({pathogen}: EditPathogenProps) =>
{

  const initialPathogen = pathogen ? pathogen : new Pathogen();
  const initialValues = {...initialPathogen, sequence: ""};
  let history = useHistory();


  const validationSchema = yup.object().shape({
    commonName: yup.string().required("Common Name is required"), scientificName: yup.string().required("Scientific Name is required"), family: yup.string().required("Family is required"), viralFactor: yup.number().required("Viral Factor is required"),
  });


  const {errors, touched, ...formik} = useFormik({
    initialValues, validationSchema: validationSchema, onSubmit: async (values, {setSubmitting}) =>
    {
      let pathogenID = pathogen ? pathogen.id : "";
      if (!pathogen) { // creation
        const newPathogen = Pathogen.fromUserData(values.commonName || '', values.scientificName || '', values.family || '', values.viralFactor, values.clinicalSymptoms || '', ["Super Crazy"], values.sequence || '');
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
        await pathogen.persist();
      }

      setSubmitting(false);
      history.push('/pathogens/' + pathogenID);

    },
  });


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
          <Form.Label>scientificName</Form.Label>
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
        {pathogen && (<Form.Group as={Col} xs={12} controlId="sequence">
          <Form.Label>Sequence</Form.Label>
          <Form.Control
          type="text"
          name="sequence"
          value={formik.values.sequence}
          onChange={formik.handleChange}
          placeholder="Sequence"
          isInvalid={!!errors.sequence && !!touched.sequence}
          />
          <Form.Control.Feedback type="invalid">{errors.sequence}</Form.Control.Feedback>
        </Form.Group>)}

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
