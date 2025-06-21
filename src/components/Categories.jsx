import './Categories.css';

import itImg from '../assets/categories/it.jpg';
import marketingImg from '../assets/categories/marketing.jpg';
import financeImg from '../assets/categories/finance.jpg';
import salesImg from '../assets/categories/sales.jpg';
import healthcareImg from '../assets/categories/healthcare.jpg';
import educationImg from '../assets/categories/education.jpg';


const categories = [
  {
    name: 'ගොඩයන Jobs',
    image: itImg
  },
  {
    name: 'ගොඩයන Visa',
    image: marketingImg
  },
  {
    name: 'ගොඩයන Courses',
    image: financeImg
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
            <button className="explore">Explore</button>
          </div>
        ))}
      </div>
    </section>
  );
}
