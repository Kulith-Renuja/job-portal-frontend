import { useEffect, useState } from 'react';
import {
  fetchCountries,
  createCountry,
  updateCountry,
  deleteCountry,
} from '../services/countryService';
import './ManageCountries.css';

export default function ManageCountries() {
  const [countries, setCountries] = useState([]);
  const [form, setForm] = useState({
    title: '',
    image: null,
    subtitles: [{ title: '', content: '' }],
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      const res = await fetchCountries();
      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setCountries(sorted);
    } catch (err) {
      console.error('Failed to fetch countries:', err);
    }
  };

  const handleChange = (e, index = null, field = null) => {
  const { name, value, files } = e.target;

  if (index !== null && field) {
    const updated = [...form.subtitles];
    updated[index][field] = value;
    setForm({ ...form, subtitles: updated });
  } else if (name === 'image') {
    if (e.target.type === 'file') {
      setForm({ ...form, image: files && files.length > 0 ? files[0] : '' });
    } else {
      setForm({ ...form, image: value });
    }
  } else {
    setForm({ ...form, [name]: value });
  }
};


  const addSubtitle = () => {
    setForm({ ...form, subtitles: [...form.subtitles, { title: '', content: '' }] });
  };

  const handleEdit = (country) => {
    setEditingId(country._id);
    setForm({
      title: country.title,
      image: null,
      subtitles: country.subtitles.map((s) => ({ title: s.title, content: s.content })),
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteCountry(id);
      setCountries(countries.filter((c) => c._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    title: form.title,
    image: form.image,
    subtitles: form.subtitles
  };

  try {
    if (editingId) {
      await updateCountry(editingId, data);
    } else {
      await createCountry(data);
    }
    setForm({ title: '', image: '', subtitles: [{ title: '', content: '' }] });
    setEditingId(null);
    loadCountries();
  } catch (err) {
    console.error('Submit failed:', err);
  }
};

  return (
    <div className="manage-countries">
      <h1 className="manage-title">Manage Countries</h1>

      <form className="country-form" onSubmit={handleSubmit}>
        <h2>{editingId ? 'Edit Country' : 'Add New Country'}</h2>
        <input
          type="text"
          name="title"
          placeholder="Country Name"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image || ''}
          onChange={handleChange}
        />


        <h3>Subtitles & Content</h3>
        {form.subtitles.map((sub, index) => (
          <div key={index} className="subtitle-group">
            <input
              type="text"
              name="subtitle"
              placeholder="Subtitle"
              value={sub.title}
              onChange={(e) => handleChange(e, index, 'title')}
              required
            />
            <textarea
              name="content"
              placeholder="Content"
              value={sub.content}
              onChange={(e) => handleChange(e, index, 'content')}
              required
            />
          </div>
        ))}

        <button type="button" onClick={addSubtitle} className="add-subtitle">
          + Add Subtitle
        </button>

        <button type="submit" className="submit-btn">
          {editingId ? 'Update Country' : 'Add Country'}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ title: '', image: '', subtitles: [{ title: '', content: '' }] });
            }}
            className="cancel-btn "
          >
            Cancel
          </button>
        )}

      </form>

      <div className="country-list">
        {countries.map((country) => (
          <div key={country._id} className="country-row">
            <span>{country.title}</span>
            <div className="country-actions">
              <button onClick={() => handleEdit(country)}>Edit</button>
              <button className="delete" onClick={() => handleDelete(country._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
}
