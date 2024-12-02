import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleRepoClick = (repo) => {
        navigate(`/repo/${repo.name}`, { state: { repo } });
    };

    useEffect(() => {
        const currentUrl = window.location.href;
        const url = new URL(currentUrl);
        let token = url.searchParams.get('token') || localStorage.getItem('token');

        if (token) {
            localStorage.setItem('token', token);

            // Fetch user profile
            axios
                .get('http://localhost:5000/api/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => setUser(response.data))
                .catch((err) => setError('Failed to fetch user profile.'));

            // Fetch repositories
            const fetchRepos = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/projects/repos`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setRepos(response.data);
                } catch (err) {
                    setError('Failed to load repositories.');
                } finally {
                    setLoading(false);
                }
            };

            fetchRepos();
        } else {
            setError('Token not found.');
        }
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome, {user.name}</h1>
                <p><strong>GitHub Username:</strong> {user.username}</p>
                <img className="avatar" src={user.avatar} alt="Profile" />
            </header>

            <main className="dashboard-main">
                <div className="repo-summary">
                    <h2>Total Repositories: {repos.length}</h2>
                    <a href="/repo/all">See other Repos</a>
                </div>
                <div className="repo-list">
                    {repos.map((repo) => (
                        <div key={repo.id} className="repo-card"
                    onClick={() => handleRepoClick(repo)}
                    style={{ cursor: 'pointer' }}>
                            <h3>
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                    {repo.name}
                                </a>
                            </h3>
                            <p><strong>Visibility:</strong> {repo.private ? 'Private' : 'Public'}</p>
                            <p><strong>Forks:</strong> {repo.forks_count}</p>
                            <p><strong>Likes (Stars):</strong> {repo.stargazers_count}</p>
                            <p><strong>Size:</strong> {repo.size} KB</p>
                            <p><strong>Created At:</strong> {new Date(repo.created_at).toLocaleDateString()}</p>
                            <p><strong>Last Commit:</strong> {new Date(repo.pushed_at).toLocaleDateString()}</p>
                            <p><strong>Total Commits:</strong> {repo.totalCommits || 'N/A'}</p>
                            <p><strong>Viewers:</strong> {repo.watchers_count}</p>
                            <p><strong>Technologies:</strong> {repo.language || 'Not specified'}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
