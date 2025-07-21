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

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  min-height: 120px;
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

const RecruiterForm = () => {
  const formik = useFormik({
    initialValues: {
      company: '',
      recruiterName: '',
      email: '',
      position: '',
      description: '',
      requirements: '',
    },
    validationSchema: Yup.object({
      company: Yup.string().required('Required'),
      recruiterName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      position: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      requirements: Yup.string().required('Required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <FormSection>
      <h2>Hiring Request</h2>
      <p>Submit your hiring requests and we'll share them with our developer network.</p>
      <Form onSubmit={formik.handleSubmit}>
        <Input
          id="company"
          name="company"
          type="text"
          placeholder="Company Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.company}
        />
        {formik.touched.company && formik.errors.company ? (
          <div>{formik.errors.company}</div>
        ) : null}

        <Input
          id="recruiterName"
          name="recruiterName"
          type="text"
          placeholder="Your Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.recruiterName}
        />
        {formik.touched.recruiterName && formik.errors.recruiterName ? (
          <div>{formik.errors.recruiterName}</div>
        ) : null}

        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Contact Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        <Input
          id="position"
          name="position"
          type="text"
          placeholder="Position Title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.position}
        />
        {formik.touched.position && formik.errors.position ? (
          <div>{formik.errors.position}</div>
        ) : null}

        <Textarea
          id="description"
          name="description"
          placeholder="Job Description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <div>{formik.errors.description}</div>
        ) : null}

        <Textarea
          id="requirements"
          name="requirements"
          placeholder="Requirements"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.requirements}
        />
        {formik.touched.requirements && formik.errors.requirements ? (
          <div>{formik.errors.requirements}</div>
        ) : null}

        <Button type="submit">Submit Request</Button>
      </Form>
    </FormSection>
  );
};

export default RecruiterForm;
