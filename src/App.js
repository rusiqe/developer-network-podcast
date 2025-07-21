import React, { useState } from 'react';
import styled from 'styled-components';
import Hero from './components/Hero';
import Features from './components/Features';
import BookingForm from './components/BookingForm';
import RecruiterForm from './components/RecruiterForm';
import './App.css';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  position: relative;
  overflow-x: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3), transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15), transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.15), transparent 50%);
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  color: white;
`;

const Logo = styled.h1`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  opacity: 0.9;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  
  button {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 14px;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    
    :hover {
      opacity: 1;
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }
    
    &.active {
      opacity: 1;
      background: rgba(255, 255, 255, 0.25);
      font-weight: 500;
    }
  }
`;

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderContent = () => {
    switch(currentView) {
      case 'booking':
        return <BookingForm />;
      case 'recruiters':
        return <RecruiterForm />;
      default:
        return (
          <>
            <Hero onBookClick={() => setCurrentView('booking')} />
            <Features />
          </>
        );
    }
  };

  return (
    <AppContainer>
      <Container>
        <Navigation>
          <Logo>Developer Network Podcast</Logo>
          <NavLinks>
            <button 
              className={currentView === 'home' ? 'active' : ''}
              onClick={() => setCurrentView('home')}
            >
              Home
            </button>
            <button 
              className={currentView === 'booking' ? 'active' : ''}
              onClick={() => setCurrentView('booking')}
            >
              Book Interview
            </button>
            <button 
              className={currentView === 'recruiters' ? 'active' : ''}
              onClick={() => setCurrentView('recruiters')}
            >
              Recruiters
            </button>
          </NavLinks>
        </Navigation>
        {renderContent()}
      </Container>
    </AppContainer>
  );
}

export default App;
