import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

const FormSection = styled.section`
  padding: 50px 20px;
  background-color: #fff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 30px;
  font-size: 16px;
  background-color: #764ba2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  :hover {
    background-color: #667eea;
  }
`;

const BookingForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      github: '',
      linkedin: '',
      website: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      github: Yup.string().url('Invalid URL').required('Required'),
      linkedin: Yup.string().url('Invalid URL').required('Required'),
      website: Yup.string().url('Invalid URL').required('Required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <FormSection>
      <h2>Book Your Interview</h2>
      <Form onSubmit={formik.handleSubmit}>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          placeholder="First Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div>{formik.errors.firstName}</div>
        ) : null}

        <Input
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Last Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div>{formik.errors.lastName}</div>
        ) : null}

        <Input
          id="github"
          name="github"
          type="text"
          placeholder="GitHub URL"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.github}
        />
        {formik.touched.github && formik.errors.github ? (
          <div>{formik.errors.github}</div>
        ) : null}

        <Input
          id="linkedin"
          name="linkedin"
          type="text"
          placeholder="LinkedIn URL"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.linkedin}
        />
        {formik.touched.linkedin && formik.errors.linkedin ? (
          <div>{formik.errors.linkedin}</div>
        ) : null}

        <Input
          id="website"
          name="website"
          type="text"
          placeholder="Personal Website"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.website}
        />
        {formik.touched.website && formik.errors.website ? (
          <div>{formik.errors.website}</div>
        ) : null}

        <Button type="submit">Submit</Button>
      </Form>
    </FormSection>
  );
};

export default BookingForm;

