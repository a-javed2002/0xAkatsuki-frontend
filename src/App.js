import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GitHubLogin from './components/GitHubLogin';
import GitHubCallback from './components/GitHubCallback';
import Dashboard from './components/Dashboard';
import Repositories from './components/Repositories';
import RepoDetail from './components/RepoDetail';
import AllRepos from './components/AllRepos';

function App() {
  return (
    <Router>
      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/api/auth/github/callback" element={<GitHubCallback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/repo" element={<Repositories />} />
        <Route path="/" element={<GitHubLogin />} />
        <Route path="/repo/:name" element={<RepoDetail />} />
        <Route path="/repo/all" element={<AllRepos />} />
      </Routes>
    </Router>
  );
}

export default App;
