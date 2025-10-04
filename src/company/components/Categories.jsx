// components/Categories.jsx
import './Categories.css';
import { Link } from 'react-router-dom';

import Jobs from '../../assets/categories/Jobs.png';
import Migration from '../../assets/categories/Migration.png';

const categories = [
  {
    name: 'ගොඩයන Jobs',
    image: Jobs,
    path: '/company/jobs',
    description: 'Find your dream career opportunities'
  },
  {
    name: 'ගොඩයන Adds',
    image: Migration,
    path: '/company/adds',
    description: 'Your pathway to global opportunities'
  }
];

export default function Categories() {
  return (
    <section className="categories">
      <div className="categories-header">
        <h2 className="section-title">Browse by Category</h2>
        <p className="section-subtitle">Discover opportunities that match your aspirations</p>
      </div>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <div className="category-card" key={index}>
            <div className="category-image-container">
              <img src={cat.image} alt={cat.name} className="category-img" />
              <div className="category-overlay">
                {/*<h3 className="category-title-overlay">{cat.name}</h3>
                <p className="category-description">{cat.description}</p>*/}
              </div>
              <div className="category-gradient"></div>
            </div>
            <div className="category-footer">
              <Link to={cat.path} className="explore-link">
                <button className="explore">
                  <span>Explore</span>
                  <svg className="explore-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}