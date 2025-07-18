// components/Categories.jsx
import './Categories.css';
import { Link } from 'react-router-dom';

import itImg from '../assets/categories/it.jpg';
import marketingImg from '../assets/categories/marketing.jpg';
import financeImg from '../assets/categories/finance.jpg';

const categories = [
  {
    name: 'ගොඩයන Jobs',
    image: itImg,
    path: '/jobs'
  },
  {
    name: 'ගොඩයන Migration',
    image: marketingImg,
    path: '/migration'
  },
  {
    name: 'ගොඩයන Courses',
    image: financeImg,
    path: '/courses'
  }
];

export default function Categories() {
  return (
    <section className="categories">
      <h2 className="section-title">Browse by Category</h2>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <div className="category-card" key={index}>
            <div className="category-image-container">
              <img src={cat.image} alt={cat.name} className="category-img" />
              <h3 className="category-title-overlay">{cat.name}</h3>
            </div>
            <Link to={cat.path}>
              <button className="explore">Explore</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
