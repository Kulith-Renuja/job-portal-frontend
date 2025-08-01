import { useEffect, useState } from 'react';
import {
  fetchMigrations,
  createMigration,
  deleteMigration,
  updateMigration,
} from '../services/migrationService';
import { uploadImage } from '../services/uploadService'; // ✅ Import upload
import './ManageMigrations.css';

export default function ManageMigrations() {
  const [migrations, setMigrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({
    title: '',
    image: '',
    subtitles: [{ title: '', content: '' }],
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetchMigrations();
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setMigrations(sorted);
    };
    load();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = form.image;

    if (form.image instanceof File) {
      try {
        imageUrl = await uploadImage(form.image);
      } catch (err) {
        console.error('Image upload failed', err);
        return;
      }
    }

    const payload = {
      title: form.title,
      image: imageUrl,
      subtitles: form.subtitles,
    };

    try {
      if (editingId) {
        const res = await updateMigration(editingId, payload);
        setMigrations((prev) =>
          prev.map((m) => (m._id === editingId ? res.data : m))
        );
      } else {
        const res = await createMigration(payload);
        setMigrations([res.data, ...migrations]);
      }

      setForm({ title: '', image: '', subtitles: [{ title: '', content: '' }] });
      setEditingId(null);
    } catch (err) {
      console.error('Failed to submit migration', err);
    }
  };

  const handleEdit = (migration) => {
    setForm({
      title: migration.title,
      image: migration.image,
      subtitles: migration.subtitles,
    });
    setEditingId(migration._id);
  };

  const handleDelete = async (id) => {
    await deleteMigration(id);
    setMigrations(migrations.filter((m) => m._id !== id));
  };

  const addSubtitle = () => {
    setForm({
      ...form,
      subtitles: [...form.subtitles, { title: '', content: '' }],
    });
  };

  const filtered = migrations.filter((m) =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-migrations">
      <h1 className="manage-title">Manage Visa</h1>

      <form className="migration-form" onSubmit={handleSubmit}>
        <h2>{editingId ? 'Edit Visa Article' : 'Add New Visa Article'}</h2>
        <input
          type="text"
          name="title"
          placeholder="Visa Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input type="file" name="image" onChange={handleChange} />

        {/* 👁️ Image Preview */}
        {form.image && (
          <div className="image-preview" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={
                form.image instanceof File
                  ? URL.createObjectURL(form.image)
                  : form.image
              }
              alt="Preview"
              style={{ width: '150px', height: 'auto', borderRadius: '8px', marginTop: '10px' }}
            />
            <button
              type="button"
              className="remove-image"
              onClick={() => setForm(prev => ({ ...prev, image: null }))}
            >
              ✖ Remove
            </button>
          </div>
        )}

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

        <button type="button" onClick={addSubtitle} className="add-subtitle">
          + Add Subtitle
        </button>
        <button type="submit" className="submit-btn">
          {editingId ? 'Update Visa' : 'Add Visa'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ title: '', image: '', subtitles: [{ title: '', content: '' }] });
            }}
            className="cancel-btn"
          >
            Cancel
          </button>
        )}
      </form>

      <input
        type="text"
        className="search-input"
        placeholder="Search Visa..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="migration-list">
        {filtered.map((m) => (
          <div key={m._id} className="migration-row">
            <span>{m.title}</span>
            <div className="migration-actions">
              <button onClick={() => handleEdit(m)}>Edit</button>
              <button onClick={() => handleDelete(m._id)} className="delete">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
