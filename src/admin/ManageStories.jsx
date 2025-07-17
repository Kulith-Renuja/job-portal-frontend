import { useState, useEffect } from 'react';
import {
  fetchStories,
  createStory,
  updateStory,
  deleteStory
} from '../services/storyService';
import { uploadImage } from '../services/uploadService'; // ✅ Cloudinary upload
import './ManageStories.css';

export default function ManageStories() {
  const [stories, setStories] = useState([]);
  const [form, setForm] = useState({ title: '', image: null, content: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      const res = await fetchStories();
      const sorted = [...res.data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setStories(sorted);
    } catch (err) {
      console.error('Error loading stories:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
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
      content: form.content,
      image: imageUrl || '',
    };

    try {
      if (editingId) {
        await updateStory(editingId, payload);
      } else {
        await createStory(payload);
      }

      setForm({ title: '', image: null, content: '' });
      setEditingId(null);
      loadStories();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStory(id);
      loadStories();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleEdit = (story) => {
    setForm({ title: story.title, image: story.image, content: story.content });
    setEditingId(story._id);
  };

  const cancelEdit = () => {
    setForm({ title: '', image: null, content: '' });
    setEditingId(null);
  };

  return (
    <div className="manage-stories">
      <h1 className="manage-title">Manage Stories</h1>

      <form className="story-form" onSubmit={handleSubmit}>
        <h2>{editingId ? 'Edit Story' : 'Add New Story'}</h2>

        <input
          type="text"
          name="title"
          placeholder="Story Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input type="file" name="image" onChange={handleChange} />

        {/* 👁️ Image Preview */}
        {form.image && (
          <div className="image-preview">
            <img
              src={
                form.image instanceof File
                  ? URL.createObjectURL(form.image)
                  : form.image
              }
              alt="Preview"
              style={{ width: '150px', height: 'auto', marginTop: '10px' }}
            />
          </div>
        )}

        <textarea
          name="content"
          placeholder="Story Content"
          rows="5"
          value={form.content}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">
          {editingId ? 'Update Story' : 'Add Story'}
        </button>
        {editingId && (
          <button type="button" onClick={cancelEdit} className="cancel-btn">
            Cancel
          </button>
        )}
      </form>

      <div className="story-list">
        {stories.map((story) => (
          <div key={story._id} className="story-row">
            <span>{story.title}</span>
            <div className="story-actions">
              <button onClick={() => handleEdit(story)}>Edit</button>
              <button className="delete" onClick={() => handleDelete(story._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
