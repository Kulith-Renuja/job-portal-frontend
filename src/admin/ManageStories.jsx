import { useState, useEffect } from 'react';
import {
  fetchStories,
  createStory,
  updateStory,
  deleteStory
} from '../services/storyService';
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

    try {
      const payload = new FormData();
      payload.append('title', form.title);
      payload.append('content', form.content);
      if (form.image) payload.append('image', form.image);

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
    setForm({ title: story.title, image: null, content: story.content });
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
