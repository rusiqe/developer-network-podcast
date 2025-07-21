import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
  text-align: center;
  padding: 100px 20px;
  color: white;
`;

const Title = styled.h1`
  font-size: 48px;
  margin: 0 0 20px;
`;

const Subtitle = styled.p`
  font-size: 24px;
  margin: 0 0 40px;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 18px;
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

const Hero = ({ onBookClick }) => {
  return (
    <HeroSection>
      <Title>Connect with a Global Developer Network</Title>
      <Subtitle>
        Join us to share ideas, resources, and direct connections to new opportunities.
      </Subtitle>
      <Button onClick={onBookClick}>Book a Discussion</Button>
    </HeroSection>
  );
};

export default Hero;

