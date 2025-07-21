import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
  text-align: center;
  padding: 80px 20px 120px;
  color: white;
  position: relative;
`;

const JoinButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 60px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
  
  &::before {
    content: '💬';
    margin-right: 8px;
  }
`;

const Title = styled.h1`
  font-size: clamp(36px, 8vw, 72px);
  font-weight: 700;
  line-height: 1.1;
  margin: 0 0 40px;
  
  span {
    background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 30%, #c7d2fe 60%, #a5b4fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Subtitle = styled.p`
  font-size: 20px;
  font-weight: 400;
  line-height: 1.6;
  margin: 0 0 60px;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border: none;
  color: white;
  padding: 16px 32px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5);
  }
`;

const SecondaryButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 16px 32px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
  
  &::before {
    content: '🔍';
    margin-right: 8px;
  }
`;

const Hero = ({ onBookClick }) => {
  return (
    <HeroSection>
      <JoinButton>Join the Conversation</JoinButton>
      <Title>
        Connect with a<br />
        <span>Global Developer</span><br />
        Network
      </Title>
      <Subtitle>
        Become a member of the widest network of developers to share
        ideas, resources, and direct connections to your next job.
      </Subtitle>
      <ButtonGroup>
        <PrimaryButton onClick={onBookClick}>Book a Discussion</PrimaryButton>
        <SecondaryButton>Explore Member Projects</SecondaryButton>
      </ButtonGroup>
    </HeroSection>
  );
};

export default Hero;

