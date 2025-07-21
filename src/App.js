import React, { useState } from 'react';
import styled from 'styled-components';
import Hero from './components/Hero';
import Features from './components/Features';
import BookingForm from './components/BookingForm';
import RecruiterForm from './components/RecruiterForm';
import './App.css';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  color: white;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  
  button {
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.3s;
    
    :hover {
      opacity: 1;
    }
    
    &.active {
      opacity: 1;
      font-weight: 600;
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
