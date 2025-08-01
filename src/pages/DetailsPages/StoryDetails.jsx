import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchStories } from '../../services/storyService';
import './StoryDetails.css';

export default function StoryDetails() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStory = async () => {
      try {
        const res = await fetchStories();
        const match = res.data.find((s) => s._id === id);
        setStory(match);
      } catch (err) {
        console.error('Error loading story:', err);
      } finally {
        setLoading(false);
      }
    };
    loadStory();
  }, [id]);

  if (loading) return <div className="story-details">Loading...</div>;
  if (!story) return <div className="story-details">Story not found.</div>;

  return (
    <div className="story-details">
      <h1 className="story-title">{story.title}</h1>
      {story.image && (
        <img src={story.image} alt={story.title} className="story-image" />
      )}
      <div className="story-content">
        <pre style={{ whiteSpace: 'pre-wrap' }}>{story.content}</pre>
      </div>
    </div>
  );
}
