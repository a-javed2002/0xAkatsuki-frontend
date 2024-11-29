import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GitHubLogin from './components/GitHubLogin';
import GitHubCallback from './components/GitHubCallback';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/api/auth/github/callback" element={<GitHubCallback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<GitHubLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
