import { useState } from 'react';
import './ManageCountries.css';

export default function ManageCountries() {
  const [countries, setCountries] = useState([
    {
      id: 1,
      title: 'Australia',
      image: null,
      subtitles: [
        { title: 'Migration Pathways', content: 'Skilled visa, student visa options...' },
        { title: 'Living Costs', content: 'Average monthly living cost is around...' },
      ]
    },
    {
      id: 2,
      title: 'Canada',
      image: null,
      subtitles: [
        { title: 'PR Process', content: 'Express Entry & Provincial Nominee Programs...' },
        { title: 'Job Market', content: 'In-demand IT, healthcare, and trade skills...' },
      ]
    }
  ]);

  const [form, setForm] = useState({
    title: '',
    image: null,
    subtitles: [{ title: '', content: '' }]
  });

  const handleChange = (e, index = null, field = null) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else if (name === 'subtitle' || name === 'content') {
      const updated = [...form.subtitles];
      updated[index][field] = value;
      setForm({ ...form, subtitles: updated });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addSubtitle = () => {
    setForm({ ...form, subtitles: [...form.subtitles, { title: '', content: '' }] });
  };

  const handleDelete = (id) => {
    setCountries(countries.filter((c) => c.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCountry = {
      ...form,
      id: Date.now()
    };
    setCountries([...countries, newCountry]);
    setForm({ title: '', image: null, subtitles: [{ title: '', content: '' }] });
  };

  return (
    <div className="manage-countries">
      <h1 className="manage-title">Manage Countries</h1>

      <div className="country-list">
        {countries.map((country) => (
          <div key={country.id} className="country-row">
            <span>{country.title}</span>
            <div className="country-actions">
              <button>Edit</button>
              <button className="delete" onClick={() => handleDelete(country.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <form className="country-form" onSubmit={handleSubmit}>
        <h2>Add New Country</h2>
        <input
          type="text"
          name="title"
          placeholder="Country Name"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
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

        <button type="button" onClick={addSubtitle} className="add-subtitle">+ Add Subtitle</button>

        <button type="submit" className="submit-btn">Add Country</button>
      </form>
    </div>
  );
}
