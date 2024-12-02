import React from 'react';

const GitHubLogin = () => {
    const handleLogin = () => {
        // Redirect to the backend GitHub OAuth route
        window.location.href = 'http://localhost:5000/api/auth/github';
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Sign in with GitHub</h1>
                <p style={styles.subtitle}>Access your GitHub account securely</p>
                <button style={styles.button} onClick={handleLogin}>
                    <img
                        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                        alt="GitHub Logo"
                        style={styles.icon}
                    />
                    Login with GitHub
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#24292f',  // GitHub's background color
    },
    card: {
        padding: '2rem',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%',
    },
    title: {
        fontSize: '1.75rem',
        margin: '0 0 0.5rem',
        color: '#333',
    },
    subtitle: {
        fontSize: '1rem',
        marginBottom: '1.5rem',
        color: '#666',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.75rem 1.5rem',
        borderRadius: '5px',
        backgroundColor: '#333',  // GitHub button color
        color: '#fff',
        fontSize: '1rem',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        width: '100%',
    },
    buttonHover: {
        backgroundColor: '#555',
    },
    icon: {
        width: '24px',
        height: '24px',
        marginRight: '0.5rem',
    },
};

export default GitHubLogin;
