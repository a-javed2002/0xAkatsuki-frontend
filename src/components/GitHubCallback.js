import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import axios from 'axios';

const GitHubCallback = () => {
    const navigate = useNavigate(); // Using useNavigate instead of useHistory

    useEffect(() => {
        // Get the 'code' parameter from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            // Send the code to the backend to get the JWT token
            axios.post('http://localhost:5000/api/auth/github/callback', { code })
                .then((response) => {
                    if (response.data.success && response.data.token) {
                        // Store the token in localStorage or state (you can also use a Context or Redux)
                        localStorage.setItem('token', response.data.token);

                        // Redirect the user to the Dashboard or another page
                        navigate('/dashboard'); // Updated to use navigate instead of history.push
                    } else {
                        console.error('Login failed', response.data);
                        // Handle failure case (show an error message)
                    }
                })
                .catch((error) => {
                    console.error('Error during authentication', error);
                    // Handle the error (show an error message)
                });
        } else {
            console.error('No code in the URL');
        }
    }, [navigate]); // Add navigate to dependencies

    return (
        <div>
            <h1>Logging in...</h1>
            <p>Processing GitHub authentication...</p>
        </div>
    );
};

export default GitHubCallback;
