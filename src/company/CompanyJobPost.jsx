import { useState } from 'react';
import { createJob } from '../services/jobService';
import { uploadImage } from '../services/uploadService';
import './CompanyJobPost.css';

export default function CompanyJobPost() {
  const [form, setForm] = useState({
    jobTitle: '',
    jobCategory: '',
    jobType: '',
    description: '',
    locationType: 'sri-lanka',
    district: '',
    city: '',
    country: '',
    overseasCity: '',
    salary: '',
    educationLevel: '',
    qualificationLevel: [],
    rolesAndResponsibilities: [],
    languages: [],
    deadline: '',
    email: '',
    image: null,
  });

  const [newQualification, setNewQualification] = useState('');
  const [newResponsibility, setNewResponsibility] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const addToList = (field, value, setter) => {
    if (value.trim() !== '') {
      setForm((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));
      setter('');
    }
  };

  const removeFromList = (field, index) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = form.image;
    if (form.image instanceof File) {
      try {
        imageUrl = await uploadImage(form.image);
      } catch (err) {
        console.error('Image upload failed', err);
        setLoading(false);
        return;
      }
    }

    const location =
      form.locationType === 'sri-lanka'
        ? { country: 'Sri Lanka', district: form.district, city: form.city }
        : { country: form.country, city: form.overseasCity };

    const payload = {
      title: form.jobTitle,              
      category: form.jobCategory,        
      description: form.description,
      location: {
        country:
          form.locationType === 'sri-lanka'
            ? 'Sri Lanka'
            : form.country,
        district: form.locationType === 'sri-lanka' ? form.district : '',
        city:
          form.locationType === 'sri-lanka'
            ? form.city
            : form.overseasCity,
      },
      salary: form.salary,
      educationLevel: form.educationLevel,
      qualificationLevel: form.qualificationLevel,
      rolesAndResponsibilities: form.rolesAndResponsibilities,
      languages: form.languages,
      deadline: form.deadline,
      email: form.email,
      imageUrl: imageUrl,                
    };

    try {
      await createJob(payload);
      alert('Job posted successfully!');
      setForm({
        jobTitle: '',
        jobCategory: '',
        jobType: '',
        description: '',
        locationType: 'sri-lanka',
        district: '',
        city: '',
        country: '',
        overseasCity: '',
        salary: '',
        educationLevel: '',
        qualificationLevel: [],
        rolesAndResponsibilities: [],
        languages: [],
        deadline: '',
        email: '',
        image: null,
      });
    } catch (err) {
      console.error('Job creation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-post-container">
      <h2>Post a New Job</h2>
      <form className="job-post-form" onSubmit={handleSubmit}>
        <label>Job Title*</label>
        <input
          type="text"
          name="jobTitle"
          value={form.jobTitle}
          onChange={handleChange}
          required
        />

        <label>Job Category*</label>
        <select name="jobCategory" value={form.jobCategory} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="IT">IT</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
          <option value="Design">Design</option>
        </select>

        <label>Job Type</label>
        <input
          type="text"
          name="jobType"
          value={form.jobType}
          onChange={handleChange}
          placeholder="Full-time / Part-time / Remote"
        />

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="4"
        />

        <label>Location Type</label>
        <select
          name="locationType"
          value={form.locationType}
          onChange={handleChange}
        >
          <option value="sri-lanka">Sri Lanka</option>
          <option value="overseas">Overseas</option>
        </select>

        {form.locationType === 'sri-lanka' ? (
          <>
            <label>District</label>
            <input
              type="text"
              name="district"
              value={form.district}
              onChange={handleChange}
            />
            <label>City</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
            />
            <label>City</label>
            <input
              type="text"
              name="overseasCity"
              value={form.overseasCity}
              onChange={handleChange}
            />
          </>
        )}

        <label>Salary</label>
        <input
          type="text"
          name="salary"
          value={form.salary}
          onChange={handleChange}
          placeholder="Optional (e.g., 80,000 - 100,000 LKR)"
        />

        <label>Education Level</label>
        <select
          name="educationLevel"
          value={form.educationLevel}
          onChange={handleChange}
        >
          <option value="">Select Education Level</option>
          <option value="O/L">O/L</option>
          <option value="A/L">A/L</option>
          <option value="Diploma">Diploma</option>
          <option value="Degree">Degree</option>
          <option value="Masters">Masters</option>
          <option value="PhD">PhD</option>
        </select>

        {/* Qualifications */}
        <label>Qualifications</label>
        <div className="multi-input">
          <input
            type="text"
            value={newQualification}
            onChange={(e) => setNewQualification(e.target.value)}
            placeholder="Add qualification"
          />
          <button
            type="button"
            onClick={() => addToList('qualificationLevel', newQualification, setNewQualification)}
          >
            Add
          </button>
        </div>
        <ul className="chip-list">
          {form.qualificationLevel.map((q, i) => (
            <li key={i} onClick={() => removeFromList('qualificationLevel', i)}>
              {q} ✖
            </li>
          ))}
        </ul>

        {/* Roles */}
        <label>Roles & Responsibilities</label>
        <div className="multi-input">
          <input
            type="text"
            value={newResponsibility}
            onChange={(e) => setNewResponsibility(e.target.value)}
            placeholder="Add responsibility"
          />
          <button
            type="button"
            onClick={() => addToList('rolesAndResponsibilities', newResponsibility, setNewResponsibility)}
          >
            Add
          </button>
        </div>
        <ul className="chip-list">
          {form.rolesAndResponsibilities.map((r, i) => (
            <li key={i} onClick={() => removeFromList('rolesAndResponsibilities', i)}>
              {r} ✖
            </li>
          ))}
        </ul>

        {/* Languages */}
        <label>Languages</label>
        <div className="multi-input">
          <input
            type="text"
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            placeholder="Add language"
          />
          <button
            type="button"
            onClick={() => addToList('languages', newLanguage, setNewLanguage)}
          >
            Add
          </button>
        </div>
        <ul className="chip-list">
          {form.languages.map((l, i) => (
            <li key={i} onClick={() => removeFromList('languages', i)}>
              {l} ✖
            </li>
          ))}
        </ul>

        <label>Deadline</label>
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
        />

        <label>Email (Optional)</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Leave empty to use company email"
        />

        <label>Upload Job Image</label>
        <input type="file" name="image" onChange={handleChange} />
        {form.image && (
          <div className="image-preview">
            <img
              src={form.image instanceof File ? URL.createObjectURL(form.image) : form.image}
              alt="Preview"
            />
            <button
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, image: null }))}
            >
              Remove
            </button>
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
}
