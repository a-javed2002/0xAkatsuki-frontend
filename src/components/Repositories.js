import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Repositories = ({ }) => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                // Retrieve the token from localStorage
                const token = localStorage.getItem('token');

                // Make the API request with the token in the headers
                const response = await axios.get(`http://localhost:5000/api/projects/repos`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Assuming Bearer token; adjust if needed
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
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>User Repositories</h2>
            <ul>
                {repos.map((repo) => (
                    <li key={repo.id} style={{ marginBottom: '1rem' }}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            <strong>{repo.name}</strong>
                        </a>
                        <p>
                            <strong>Visibility:</strong> {repo.private ? 'Private' : 'Public'}
                        </p>
                        <p>
                            <strong>Forks:</strong> {repo.forks_count}
                        </p>
                        <p>
                            <strong>Likes (Stars):</strong> {repo.stargazers_count}
                        </p>
                        <p>
                            <strong>Size:</strong> {repo.size} KB
                        </p>
                        <p>
                            <strong>Created At:</strong> {new Date(repo.created_at).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Last Commit:</strong> {new Date(repo.pushed_at).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Total Commits:</strong> {repo.totalCommits}
                        </p>
                        <p>
                            <strong>Viewers:</strong> {repo.watchers_count}
                        </p>
                        <p>
                            <strong>Technologies:</strong>{' '}
                            {repo.language ? repo.language : 'Not specified'}
                        </p>
                    </li>

                ))}
            </ul>
        </div>
    );
};

export default Repositories;
