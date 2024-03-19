// SubmitForm.js
import React, { useState } from 'react';
import axios from 'axios';

function SubmitForm() {
    const [formData, setFormData] = useState({
        username: '',
        language: '',
        stdin: '',
        source_code: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/submit', formData);
            alert('Snippet submitted successfully!');
            setFormData({
                username: '',
                language: '',
                stdin: '',
                source_code: ''
            });
        } catch (error) {
            console.error('Error submitting snippet:', error);
            alert('Error submitting snippet. Please try again.');
        }
    };

    return (
        <div>
            <h2>Submit Code Snippet</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div>
                    <label>Preferred Code Language:</label>
                    <select name="language" value={formData.language} onChange={handleChange} required>
                        <option value="">Select Language</option>
                        <option value="C++">C++</option>
                        <option value="Java">Java</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                    </select>
                </div>
                <div>
                    <label>Standard Input:</label>
                    <textarea name="stdin" value={formData.stdin} onChange={handleChange}></textarea>
                </div>
                <div>
                    <label>Source Code:</label>
                    <textarea name="source_code" value={formData.source_code} onChange={handleChange} required></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default SubmitForm;
