// DisplaySnippets.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DisplaySnippets() {
    const [snippets, setSnippets] = useState([]);

    useEffect(() => {
        fetchSnippets();
    }, []);

    const fetchSnippets = async () => {
        try {
            const response = await axios.get('http://localhost:5000/snippets');
            setSnippets(response.data);
        } catch (error) {
            console.error('Error fetching snippets:', error);
        }
    };

    return (
        <div>
            <h2>Submitted Snippets</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Language</th>
                        <th>Stdin</th>
                        <th>Source Code</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {snippets.map(snippet => (
                        <tr key={snippet.id}>
                            <td>{snippet.username}</td>
                            <td>{snippet.language}</td>
                            <td>{snippet.stdin}</td>
                            <td>{snippet.source_code}</td>
                            <td>{snippet.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DisplaySnippets;
