import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllRepos.css'; // Assume we have a corresponding CSS file
import { useNavigate } from 'react-router-dom';

const AllRepos = () => {
    const [repos, setRepos] = useState([]);
    const [filteredRepos, setFilteredRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        visibility: '',
        search: '',
        author: ''
    });

    const navigate = useNavigate();

    const handleRepoClick = (repo) => {
        navigate(`/repo/${repo.name}`, { state: { repo } });
    };

    // Fetch all repositories and authors info
    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (token) {
            axios
                .get('http://localhost:5000/api/projects/all-repos', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log('API Response:', response.data); // Log the raw response
                    
                    // Flatten user repositories into a single array
                    const allRepos = response.data.flatMap(user => 
                        user.repos.map(repo => ({
                            ...repo,
                            author: user.name // Assuming `user.name` holds author info
                        }))
                    );

                    setRepos(allRepos);
                    setFilteredRepos(allRepos);
                })
                .catch((err) => {
                    console.error(err);
                    setError('Failed to load repositories.');
                })
                .finally(() => setLoading(false));
        } else {
            setError('Token not found.');
            
        }
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const filterRepos = () => {
        let filteredData = repos;

        if (filters.search) {
            filteredData = filteredData.filter((repo) =>
                repo.name.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        if (filters.visibility) {
            filteredData = filteredData.filter(
                (repo) => (filters.visibility === 'private' ? repo.private : !repo.private)
            );
        }

        if (filters.author) {
            filteredData = filteredData.filter((repo) =>
                repo.owner.login?.toLowerCase().includes(filters.author.toLowerCase())
            );
        }

        setFilteredRepos(filteredData);
    };

    useEffect(() => {
        filterRepos();
    }, [filters]);

    

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="all-repos-container">
            <header className="header">
                <div className="head-main">
                <h1>All Repositories</h1>
                <a href="/dashboard">Dashboard</a>
                </div>
                <div className="filters">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search by repo name"
                        value={filters.search}
                        onChange={handleFilterChange}
                    />
                    <select name="visibility" value={filters.visibility} onChange={handleFilterChange}>
                        <option value="">All Visibility</option>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                    <input
                        type="text"
                        name="author"
                        placeholder="Search by author"
                        value={filters.author}
                        onChange={handleFilterChange}
                    />
                </div>
            </header>

            <main className="repo-list">
                {filteredRepos.length === 0 ? (
                    <p>No repositories found with the given filters.</p>
                ) : (
                    filteredRepos.map((repo, index) => (
                        <div
                            key={repo.id || `${repo.full_name}-${index}`}
                            className="repo-card"
                            onClick={() => handleRepoClick(repo)}
                            style={{ cursor: 'pointer' }}
                        >
                            <h3>
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                    {repo.name}
                                </a>
                            </h3>
                            <p><strong>Author:</strong> {repo.owner.login || 'Unknown'}</p>
                            <p><strong>Visibility:</strong> {repo.private ? 'Private' : 'Public'}</p>
                            <p><strong>Forks:</strong> {repo.forks_count}</p>
                            <p><strong>Stars:</strong> {repo.stargazers_count}</p>
                            <p><strong>Created At:</strong> {new Date(repo.created_at).toLocaleDateString()}</p>
                            <p><strong>Last Commit:</strong> {new Date(repo.pushed_at).toLocaleDateString()}</p>
                            <p><strong>Technologies:</strong> {repo.language || 'Not specified'}</p>
                        </div>
                    ))
                )}
            </main>
        </div>
    );
};

export default AllRepos;
