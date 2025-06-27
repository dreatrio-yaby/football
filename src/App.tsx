import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { MatchesProvider } from './contexts/MatchesContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MatchDetailPage from './pages/MatchDetailPage';
import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <MatchesProvider>
        <Router basename="/football">
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/match/:matchId" element={<MatchDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </MatchesProvider>
    </ThemeProvider>
  );
}

export default App; 