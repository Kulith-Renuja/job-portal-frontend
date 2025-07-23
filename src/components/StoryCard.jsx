import './StoryCard.css';
import { Link } from 'react-router-dom';

export default function StoryCard({ story }) {
  return (
    <div className="story-card">
      <div className="story-image-container">
        <img src={story.image} alt={story.title} className="story-image" />
        <div className="story-overlay"></div>
      </div>
      <div className="story-content">
        <h3 className="story-title">{story.title}</h3>
        <p className="story-desc">{story.content}</p>
        <div className="story-footer">
          <Link to={`/stories/${story._id}`}>
            <button className="story-btn">
              <span>Read More</span>
              <span className="story-arrow">→</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}