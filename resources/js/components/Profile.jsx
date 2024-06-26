import React, { useState } from 'react';
import axios from 'axios';

const Profile = ({ user }) => {
  
    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        about_me: user.about_me || '',
        live_place: user.live_place || '',
        phone_number: user.phone_number || '',
        languages: user.languages || [],
        educations: user.educations || [],
        experiences: user.experiences || [],
        skills: user.skills || [],
        hobbies: user.hobbies || [],
        avatar: null,
    });

    const userId = user.id;
    console.log(userId); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateName = async () => {
        try {
            const response = await axios.post(`/updateName/${userId}`, {
                name: formData.name,
            });
            console.log('Name updated successfully', response.data);
        } catch (error) {
            console.error('Error updating name:', error);
        }
    };

    const updateEmail = async () => {
        try {
            const response = await axios.post(`/updateEmail/${userId}`, {
                email: formData.email,
            });
            console.log('Email updated successfully', response.data);
        } catch (error) {
            console.error('Error updating email:', error);
        }
    };

    const updateAboutMe = async () => {
        try {
            const response = await axios.post(`/updateAboutMe/${userId}`, {
                about_me: formData.about_me,
            });
            console.log('About Me updated successfully', response.data);
        } catch (error) {
            console.error('Error updating About Me:', error);
        }
    };

    const updateLivePlace = async () => {
        try {
            const response = await axios.post(`/updateLivePlace/${userId}`, {
                live_place: formData.live_place,
            });
            console.log('Live Place updated successfully', response.data);
        } catch (error) {
            console.error('Error updating Live Place:', error);
        }
    };

    const updatePhoneNumber = async () => {
        try {
            const response = await axios.post(`/updatePhoneNumber/${userId}`, {
                phone_number: formData.phone_number,
            });
            console.log('Phone Number updated successfully', response.data);
        } catch (error) {
            console.error('Error updating Phone Number:', error);
        }
    };

    const updateLanguages = async () => {
        try {
            const response = await axios.post(`/updateLanguages/${userId}`, {
                languages: formData.languages,
            });
            console.log('Languages updated successfully', response.data);
        } catch (error) {
            console.error('Error updating Languages:', error);
        }
    };

    const updateEducations = async () => {
        try {
            const response = await axios.post(`/updateEducations/${userId}`, {
                educations: formData.educations,
            });
            console.log('Educations updated successfully', response.data);
        } catch (error) {
            console.error('Error updating Educations:', error);
        }
    };

    const updateExperiences = async () => {
        try {
            const response = await axios.post(`/updateExperiences/${userId}`, {
                experiences: formData.experiences,
            });
            console.log('Experiences updated successfully', response.data);
        } catch (error) {
            console.error('Error updating Experiences:', error);
        }
    };

    const updateSkills = async () => {
        try {
            const response = await axios.post(`/updateSkills/${userId}`, {
                skills: formData.skills,
            });
            console.log('Skills updated successfully', response.data);
        } catch (error) {
            console.error('Error updating Skills:', error);
        }
    };

    const updateHobbies = async () => {
        try {
            const response = await axios.post(`/updateHobbies/${userId}`, {
                hobbies: formData.hobbies,
            });
            console.log('Hobbies updated successfully', response.data);
        } catch (error) {
            console.error('Error updating Hobbies:', error);
        }
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            avatar: e.target.files[0],
        }));
    };

    const handleUpload = async () => {
        const formDataObj = new FormData();
        formDataObj.append('avatar', formData.avatar);

        try {
            const response = await axios.post(`/upload/${userId}`, formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Avatar uploaded successfully', response.data);
        } catch (error) {
            console.error('Error uploading avatar:', error);
        }
    };

    const handleAddField = (field) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: [...prevData[field], {}],
        }));
    };

    const handleRemoveField = (field, index) => {
        const updatedData = { ...formData };
        updatedData[field].splice(index, 1);
        setFormData(updatedData);
    };

    const handleArrayFieldChange = (e, index, field) => {
        const { name, value } = e.target;
        const updatedData = { ...formData };
        updatedData[field][index][name] = value;
        setFormData(updatedData);
    };

    return (
        <div>
            <h1>Profile</h1>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                <button onClick={updateName}>Save</button>
            </div>
            <div>
                <label>Email:</label>
                <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
                <button onClick={updateEmail}>Save</button>
            </div>
            <div>
                <label>About Me:</label>
                <textarea name="about_me" value={formData.about_me} onChange={handleInputChange} />
                <button onClick={updateAboutMe}>Save</button>
            </div>
            <div>
                <label>Live Place:</label>
                <input type="text" name="live_place" value={formData.live_place} onChange={handleInputChange} />
                <button onClick={updateLivePlace}>Save</button>
            </div>
            <div>
                <label>Phone Number:</label>
                <input type="text" name="phone_number" value={formData.phone_number} onChange={handleInputChange} />
                <button onClick={updatePhoneNumber}>Save</button>
            </div>
            <div>
                <label>Languages:</label>
                {formData.languages.map((language, index) => (
                    <div key={index}>
                        <input type="text" name="name" value={language.name} onChange={(e) => handleArrayFieldChange(e, index, 'languages')} />
                        <button onClick={() => handleRemoveField('languages', index)}>Remove</button>
                    </div>
                ))}
                <button onClick={() => handleAddField('languages')}>Add Language</button>
                <button onClick={updateLanguages}>Save Languages</button>
            </div>
            <div>
                <label>Educations:</label>
                {formData.educations.map((education, index) => (
                    <div key={index}>
                        <input type="text" name="institution" value={education.institution} onChange={(e) => handleArrayFieldChange(e, index, 'educations')} />
                        <button onClick={() => handleRemoveField('educations', index)}>Remove</button>
                    </div>
                ))}
                <button onClick={() => handleAddField('educations')}>Add Education</button>
                <button onClick={updateEducations}>Save Educations</button>
            </div>
            <div>
                <label>Experiences:</label>
                {formData.experiences.map((experience, index) => (
                    <div key={index}>
                        <input type="text" name="company" value={experience.company} onChange={(e) => handleArrayFieldChange(e, index, 'experiences')} />
                        <button onClick={() => handleRemoveField('experiences', index)}>Remove</button>
                    </div>
                ))}
                <button onClick={() => handleAddField('experiences')}>Add Experience</button>
                <button onClick={updateExperiences}>Save Experiences</button>
            </div>
            <div>
                <label>Skills:</label>
                {formData.skills.map((skill, index) => (
                    <div key={index}>
                        <input type="text" name="name" value={skill.name} onChange={(e) => handleArrayFieldChange(e, index, 'skills')} />
                        <button onClick={() => handleRemoveField('skills', index)}>Remove</button>
                    </div>
                ))}
                <button onClick={() => handleAddField('skills')}>Add Skill</button>
                <button onClick={updateSkills}>Save Skills</button>
            </div>
            <div>
                <label>Hobbies:</label>
                {formData.hobbies.map((hobby, index) => (
                    <div key={index}>
                        <input type="text" name="name" value={hobby.name} onChange={(e) => handleArrayFieldChange(e, index, 'hobbies')} />
                        <button onClick={() => handleRemoveField('hobbies', index)}>Remove</button>
                    </div>
                ))}
                <button onClick={() => handleAddField('hobbies')}>Add Hobby</button>
                <button onClick={updateHobbies}>Save Hobbies</button>
            </div>
            <div>
                <label>Avatar:</label>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>
        </div>
    );
};

export default Profile;
