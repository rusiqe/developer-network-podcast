import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

const FormSection = styled.section`
  padding: 80px 20px;
  color: white;
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 50px;
  max-width: 600px;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 10px;
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const FormSubtitle = styled.p`
  font-size: 16px;
  opacity: 0.8;
  text-align: center;
  margin: 0 0 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const InputContainer = styled.div`
  flex: 1;
  position: relative;
`;

const InputLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  opacity: 0.9;
  
  &::before {
    content: ${props => props.icon || "''"};
    margin-right: 8px;
    font-size: 16px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 14px;
  margin-top: 5px;
`;

const SelectContainer = styled.div`
  position: relative;
`;

const Select = styled.select`
  width: 100%;
  padding: 16px 20px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-sizing: border-box;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(255, 255, 255, 0.15);
  }
  
  option {
    background: #4338ca;
    color: white;
  }
`;

const IntegrationSection = styled.div`
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
`;

const IntegrationTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  ::before {
    content: '🔧';
    margin-right: 8px;
  }
`;

const IntegrationText = styled.p`
  margin: 0 0 15px;
  font-size: 14px;
  opacity: 0.8;
`;

const IntegrationButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const IntegrationButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  :hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border: none;
  color: white;
  padding: 18px 40px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
  margin-top: 10px;
  
  :hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5);
  }
  
  :disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const BookingForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      github: '',
      howFound: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      github: Yup.string().url('Invalid URL').required('Required'),
      howFound: Yup.string().required('Required'),
    }),
    onSubmit: values => {
      alert('Form submitted! ' + JSON.stringify(values, null, 2));
    },
  });

  return (
    <FormSection>
      <FormContainer>
        <FormTitle>Book Your Interview</FormTitle>
        <FormSubtitle>Let's get to know you better!</FormSubtitle>
        
        <Form onSubmit={formik.handleSubmit}>
          <InputGroup>
            <InputContainer>
              <InputLabel icon="'👤'">First Name</InputLabel>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="John"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <ErrorMessage>{formik.errors.firstName}</ErrorMessage>
              )}
            </InputContainer>
            
            <InputContainer>
              <InputLabel icon="'👤'">Last Name</InputLabel>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Doe"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <ErrorMessage>{formik.errors.lastName}</ErrorMessage>
              )}
            </InputContainer>
          </InputGroup>

          <InputContainer>
            <InputLabel icon="'✉️'">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john.doe@example.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <ErrorMessage>{formik.errors.email}</ErrorMessage>
            )}
          </InputContainer>

          <InputContainer>
            <InputLabel icon="'🔗'">Github Profile</InputLabel>
            <Input
              id="github"
              name="github"
              type="text"
              placeholder="https://github.com/johndoe or johndoe"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.github}
            />
            {formik.touched.github && formik.errors.github && (
              <ErrorMessage>{formik.errors.github}</ErrorMessage>
            )}
          </InputContainer>

          <InputContainer>
            <InputLabel icon="'🔍'">How did you find us?</InputLabel>
            <SelectContainer>
              <Select
                id="howFound"
                name="howFound"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.howFound}
              >
                <option value="">Select how you found us...</option>
                <option value="social-media">Social Media</option>
                <option value="github">GitHub</option>
                <option value="friend">Friend/Colleague</option>
                <option value="search">Search Engine</option>
                <option value="other">Other</option>
              </Select>
            </SelectContainer>
            {formik.touched.howFound && formik.errors.howFound && (
              <ErrorMessage>{formik.errors.howFound}</ErrorMessage>
            )}
          </InputContainer>

          <IntegrationSection>
            <IntegrationTitle>Integration Setup</IntegrationTitle>
            <IntegrationText>
              This form currently uses localStorage. To enable full functionality:
            </IntegrationText>
            <IntegrationButtons>
              <IntegrationButton type="button">Setup Airtable</IntegrationButton>
              <IntegrationButton type="button">Setup Cal.com</IntegrationButton>
            </IntegrationButtons>
          </IntegrationSection>

          <SubmitButton type="submit" disabled={!formik.isValid}>
            Book My Interview
          </SubmitButton>
        </Form>
      </FormContainer>
    </FormSection>
  );
};

export default BookingForm;

