import React from "react";
import {Pathogen} from "./Pathogen"
import {useFormik} from "formik";
import * as yup from "yup";


const Create = () =>
{
  const pathogen = new Pathogen();
  const initialValues = {...pathogen, sequence: ""};
  const {errors, touched, ...formik} = useFormik({
    initialValues, validationSchema: yup.object().shape({
      commonName: yup.string().required("Common Name is required"),
    }), onSubmit                   : async (values, {setSubmitting}) =>
    {
      console.log('submission', values);
    },
  });


  return (<>
    <h1>Create</h1>
    {/*<Button onClick={() =>*/}
    {/*{*/}
    {/*  const pathogen = Pathogen.fromUserData("Test", "Test Name", "", "", "", ["t1"], "asdasdasdasd");*/}
    {/*  pathogen.persist();*/}
    {/*}}>*/}
    {/*  Do it*/}
    {/*</Button>*/}
  </>)
}

export {Create}
