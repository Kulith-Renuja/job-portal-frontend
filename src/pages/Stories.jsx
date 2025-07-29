import { useEffect, useState } from 'react';
import StoryCard from '../components/StoryCard';
import { fetchStories } from '../services/storyService';
import './Stories.css';

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadStories = async () => {
      try {
        const res = await fetchStories();
        setStories(res.data);
      } catch (err) {
        console.error('Error fetching stories:', err);
      }
    };
    loadStories();
  }, []);

  const filtered = stories.filter((story) =>
    story.title.toLowerCase().includes(search.toLowerCase()) ||
    story.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="stories-page">
      <section className="stories-header">
        <h1>ගොඩයන Stories</h1>
        <div className="story-search-bar">
          <input
            type="text"
            placeholder="Search stories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      <section className="stories-grid">
        {filtered.length > 0 ? (
          filtered.map((story, i) => <StoryCard key={i} story={story} />)
        ) : (
          <p className="no-results">No stories found.</p>
        )}
      </section>
    </div>
  );
}
