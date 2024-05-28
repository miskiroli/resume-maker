import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ user }) => {
  useEffect(() => {
    console.log('User:', user);
    console.log('Languages:', user.languages);
    console.log('Educations:', user.educations);
    console.log('Experiences:', user.experiences);
    console.log('Hobbies:', user.hobbies);
    console.log('Images:', user.images);
    console.log('Skills:', user.skills);
  }, [user]);

  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    about_me: user ? user.about_me : '',
    live_place: user ? user.live_place : '',
    phone_number: user ? user.phone_number : '',
    languages: user && user.languages ? user.languages : [{ name: '', level: '' }],
    educations: user && user.educations ? user.educations : [{ institution: '', degree: '', field_of_study: '', start_date: '', end_date: '' }],
    experiences: user && user.experiences ? user.experiences : [{ company: '', position: '', description: '', start_date: '', end_date: '' }],
    skills: user && user.skills ? user.skills : [{ name: '' }],
    hobbies: user && user.hobbies ? user.hobbies : [{ name: '', description: '' }],
    profile_images: user && user.profile_images ? user.profile_images : [{ image_path: '' }],
  });

  const handleChange = (e, index, field) => {
    const { name, value } = e.target;
    setFormData(prevState => {
      const newData = { ...prevState };
      if (Array.isArray(newData[field])) {
        newData[field][index][name] = value;
      } else {
        newData[field][name] = value;
      }
      return newData;
    });
  };

  const handleAddField = (field) => {
    const newData = { ...formData };
    switch (field) {
      case 'languages':
        newData.languages.push({ name: '', level: '' });
        break;
      case 'educations':
        newData.educations.push({ institution: '', degree: '', field_of_study: '', start_date: '', end_date: '' });
        break;
      case 'experiences':
        newData.experiences.push({ company: '', position: '', description: '', start_date: '', end_date: '' });
        break;
      case 'skills':
        newData.skills.push({ name: '' });
        break;
      case 'hobbies':
        newData.hobbies.push({ name: '', description: '' });
        break;
      case 'profile_images':
        newData.profile_images.push({ image_path: '' });
        break;
      default:
        break;
    }
    setFormData(newData);
  };
  
  const handleRemoveField = (field, index) => {
    const newData = { ...formData };
    newData[field].splice(index, 1);
    setFormData(newData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    const imageUrl = URL.createObjectURL(file);
    setFormData({ ...formData, profile_images: [{ image_path: imageUrl }] });
  };

  const handleSubmit = async (e) => {
    console.log('Form Data:', formData);
    e.preventDefault();
    try {
      const response = await axios.put(`/profile/${user.id}`, formData);
      console.log('Profile updated:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>
        <div>
          <label>About Me:</label>
          <textarea name="about_me" value={formData.about_me} onChange={(e) => setFormData({ ...formData, about_me: e.target.value })} />
        </div>
        <div>
          <label>Live Place:</label>
          <input type="text" name="live_place" value={formData.live_place} onChange={(e) => setFormData({ ...formData, live_place: e.target.value })} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phone_number" value={formData.phone_number} onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })} />
        </div>
        <div>
          <h2>Languages:</h2>
          {formData.languages.map((language, index) => (
            <div key={index}>
              <label>Name:</label>
              <input type="text" name="name" value={language.name} onChange={(e) => handleChange(e, index, 'languages')} />
              <label>Level:</label>
              <select name="level" value={language.level} onChange={(e) => handleChange(e, index, 'languages')}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <button type="button" onClick={() => handleRemoveField('languages', index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddField('languages')}>Add Language</button>
        </div>
        <div>
          <h2>Educations:</h2>
          {formData.educations.map((education, index) => (
            <div key={index}>
              <label>Institution:</label>
              <input type="text" name="institution" value={education.institution} onChange={(e) => handleChange(e, index, 'educations')} />
              <label>Degree:</label>
              <input type="text" name="degree" value={education.degree} onChange={(e) => handleChange(e, index, 'educations')} />
              <label>Field of Study:</label>
              <input type="text" name="field_of_study" value={education.field_of_study} onChange={(e) => handleChange(e, index, 'educations')} />
              <label>Start Date:</label>
              <input type="date" name="start_date" value={education.start_date} onChange={(e) => handleChange(e, index, 'educations')} />
              <label>End Date:</label>
              <input type="date" name="end_date" value={education.end_date} onChange={(e) => handleChange(e, index, 'educations')} />
              <button type="button" onClick={() => handleRemoveField('educations', index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddField('educations')}>Add Education</button>
        </div>
        <div>
          <h2>Experiences:</h2>
          {formData.experiences.map((experience, index) => (
            <div key={index}>
              <label>Company:</label>
              <input type="text" name="company" value={experience.company} onChange={(e) => handleChange(e, index, 'experiences')} />
              <label>Position:</label>
              <input type="text" name="position" value={experience.position} onChange={(e) => handleChange(e, index, 'experiences')} />
              <label>Description:</label>
              <textarea name="description" value={experience.description} onChange={(e) => handleChange(e, index, 'experiences')} />
              <label>Start Date:</label>
              <input type="date" name="start_date" value={experience.start_date} onChange={(e) => handleChange(e, index, 'experiences')} />
              <label>End Date:</label>
              <input type="date" name="end_date" value={experience.end_date} onChange={(e) => handleChange(e, index, 'experiences')} />
              <button type="button" onClick={() => handleRemoveField('experiences', index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddField('experiences')}>Add Experience</button>
        </div>
       

        <div>
          <h2>Skills:</h2>
          {formData.skills.map((skill, index) => (
            <div key={index}>
              <label>Name:</label>
              <input 
                type="text" 
                name="name" 
                value={skill.name} 
                onChange={(e) => handleChange(e, index, 'skills')} 
              />
              <button 
                type="button" 
                onClick={() => handleRemoveField('skills', index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddField('skills')}>Add Skill</button>
        </div>
        <div>
          <h2>Profile Images:</h2>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
          />
          {formData.profile_images.map((image, index) => (
            <div key={index}>
              <img
                src={image.image_path}
                alt={`Profile ${index + 1}`}
                style={{ borderRadius: '50%', width: '100px', height: '100px' }}
              />
            </div>
          ))}
        </div>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
