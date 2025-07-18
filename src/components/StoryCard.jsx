import './StoryCard.css';
import { Link } from 'react-router-dom';

export default function StoryCard({ story }) {
  return (
    <div className="story-card">
      <img src={story.image} alt={story.title} className="story-image" />
      <div className="story-content">
        <h3 className="story-title">{story.title}</h3>
        <p className="story-desc">{story.content}</p>
        <Link to={`/stories/${story._id}`}>
          <button className="story-btn">Read More →</button>
        </Link>
      </div>
    </div>
  );
}
