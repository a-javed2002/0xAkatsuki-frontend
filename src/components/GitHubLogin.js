import React from 'react';

const GitHubLogin = () => {
    const handleLogin = () => {
        // Redirect to the backend GitHub OAuth route
        window.location.href = 'http://localhost:5000/api/auth/github';
    };

    return (
        <div>
            <button onClick={handleLogin}>
                Login with GitHub
            </button>
        </div>
    );
};

export default GitHubLogin;
