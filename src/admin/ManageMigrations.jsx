import { useState } from 'react';
import './ManageMigrations.css';

export default function ManageMigrations() {
  const [migrations, setMigrations] = useState([
    {
      id: 1,
      title: 'Canada Skilled Worker Pathway',
      image: null,
      subtitles: [
        { title: 'Eligibility', content: 'Requirements for applicants' },
        { title: 'Documents', content: 'List of required documents' },
      ],
    }
  ]);

  const [form, setForm] = useState({
    title: '',
    image: null,
    subtitles: [{ title: '', content: '' }],
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
    setMigrations(migrations.filter((m) => m.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMigration = {
      ...form,
      id: Date.now(),
    };
    setMigrations([...migrations, newMigration]);
    setForm({ title: '', image: null, subtitles: [{ title: '', content: '' }] });
  };

  return (
    <div className="manage-migrations">
      <h1 className="manage-title">Manage Migrations</h1>

      <div className="migration-list">
        {migrations.map((migration) => (
          <div key={migration.id} className="migration-row">
            <span>{migration.title}</span>
            <div className="migration-actions">
              <button>Edit</button>
              <button className="delete" onClick={() => handleDelete(migration.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <form className="migration-form" onSubmit={handleSubmit}>
        <h2>Add New Migration Article</h2>
        <input
          type="text"
          name="title"
          placeholder="Migration Title"
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
              placeholder="Subtitle Title"
              value={sub.title}
              onChange={(e) => handleChange(e, index, 'title')}
              required
            />
            <textarea
              name="content"
              placeholder="Subtitle Content"
              value={sub.content}
              onChange={(e) => handleChange(e, index, 'content')}
              required
            />
          </div>
        ))}

        <button type="button" onClick={addSubtitle} className="add-subtitle">+ Add Subtitle</button>

        <button type="submit" className="submit-btn">Add Migration</button>
      </form>
    </div>
  );
}
