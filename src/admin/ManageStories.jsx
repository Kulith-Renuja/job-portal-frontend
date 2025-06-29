import { useState } from 'react';
import './ManageStories.css';

export default function ManageStories() {
  const [stories, setStories] = useState([
    {
      id: 1,
      title: 'From Intern to Engineer',
      image: null,
      content: 'I started as an intern and got promoted to a full-time developer...',
    },
    {
      id: 2,
      title: 'My First Remote Job',
      image: null,
      content: 'Getting hired remotely changed my life and work style...',
    }
  ]);

  const [form, setForm] = useState({
    title: '',
    image: null,
    content: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStory = {
      ...form,
      id: Date.now()
    };
    setStories([...stories, newStory]);
    setForm({ title: '', image: null, content: '' });
  };

  const handleDelete = (id) => {
    setStories(stories.filter(s => s.id !== id));
  };

  return (
    <div className="manage-stories">
      <h1 className="manage-title">Manage Stories</h1>

      <div className="story-list">
        {stories.map(story => (
          <div key={story.id} className="story-row">
            <span>{story.title}</span>
            <div className="story-actions">
              <button>Edit</button>
              <button className="delete" onClick={() => handleDelete(story.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <form className="story-form" onSubmit={handleSubmit}>
        <h2>Add New Story</h2>
        <input
          type="text"
          name="title"
          placeholder="Story Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Story Content"
          rows="5"
          value={form.content}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-btn">Add Story</button>
      </form>
    </div>
  );
}
