import React from 'react';
import styled from 'styled-components';

const FeaturesSection = styled.section`
  display: flex;
  justify-content: space-around;
  padding: 50px 20px;
  background-color: #f7f7f7;
  color: #333;
`;

const FeatureCard = styled.div`
  text-align: center;
  max-width: 220px;
`;

const FeatureTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  color: #555;
`;

const Features = () => {
  return (
    <FeaturesSection>
      <FeatureCard>
        <FeatureTitle>Deep Tech Talks</FeatureTitle>
        <FeatureDescription>Engage in discussions on cutting-edge technologies and projects.</FeatureDescription>
      </FeatureCard>
      <FeatureCard>
        <FeatureTitle>Global Network</FeatureTitle>
        <FeatureDescription>Join a collaborative environment with developers worldwide.</FeatureDescription>
      </FeatureCard>
      <FeatureCard>
        <FeatureTitle>Share & Grow</FeatureTitle>
        <FeatureDescription>Accelerate learning by exchanging ideas and gaining perspectives.</FeatureDescription>
      </FeatureCard>
      <FeatureCard>
        <FeatureTitle>Resource Hub</FeatureTitle>
        <FeatureDescription>Access curated resources shared by the community.</FeatureDescription>
      </FeatureCard>
    </FeaturesSection>
  );
};

export default Features;

