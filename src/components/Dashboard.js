// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get the JWT token from localStorage
        const token = localStorage.getItem('token');

        if (token) {
            // Fetch user profile data after login, passing the token in the Authorization header
            axios
                .get('http://localhost:5000/api/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setUser(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching user profile:', error);
                });
        } else {
            // Redirect to login if no token is available
            window.location.href = '/';
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Welcome, {user.name}</h2>
            <p><strong>GitHub Username:</strong> {user.username}</p>
            <img src={user.avatar} alt="Profile" width={100} />
        </div>
    );
};

export default Dashboard;
