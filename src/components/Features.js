import React from 'react';
import styled from 'styled-components';

const FeaturesSection = styled.section`
  padding: 80px 20px;
  color: white;
  position: relative;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 80px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 30px 20px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const StatNumber = styled.h3`
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 10px;
  background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StatLabel = styled.p`
  font-size: 14px;
  opacity: 0.8;
  margin: 0;
  font-weight: 500;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 20px;
  background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 18px;
  opacity: 0.8;
  margin: 0 0 60px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 24px;
`;

const FeatureTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 15px;
  color: white;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  opacity: 0.8;
  margin: 0;
`;

const Features = () => {
  return (
    <FeaturesSection>
      {/* Stats Section */}
      <StatsContainer>
        <StatCard>
          <StatNumber>10k+</StatNumber>
          <StatLabel>Active Members</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>98%</StatNumber>
          <StatLabel>Positive Feedback</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>24h</StatNumber>
          <StatLabel>Avg. Connection Time</StatLabel>
        </StatCard>
      </StatsContainer>

      {/* Why Developers Join Section */}
      <SectionTitle>Why Developers Join Us</SectionTitle>
      <SectionSubtitle>
        A community that truly values knowledge sharing, collaboration, and innovation.
      </SectionSubtitle>
      
      <FeatureGrid>
        <FeatureCard>
          <FeatureIcon>💻</FeatureIcon>
          <FeatureTitle>Deep Tech Talks</FeatureTitle>
          <FeatureDescription>
            Engage in discussions on cutting-edge technologies and innovative projects.
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>🌍</FeatureIcon>
          <FeatureTitle>Global Network</FeatureTitle>
          <FeatureDescription>
            Join a collaborative environment with world-class developers from around the globe.
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>⚡</FeatureIcon>
          <FeatureTitle>Share & Grow</FeatureTitle>
          <FeatureDescription>
            Accelerate your learning by sharing ideas and gaining new perspectives.
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>🔗</FeatureIcon>
          <FeatureTitle>Resource Hub</FeatureTitle>
          <FeatureDescription>
            Access a curated collection of resources shared by the community.
          </FeatureDescription>
        </FeatureCard>
      </FeatureGrid>
    </FeaturesSection>
  );
};

export default Features;

