import './Categories.css';

import itImg from '../assets/categories/it.jpg';
import marketingImg from '../assets/categories/marketing.jpg';
import financeImg from '../assets/categories/finance.jpg';
import salesImg from '../assets/categories/sales.jpg';
import healthcareImg from '../assets/categories/healthcare.jpg';
import educationImg from '../assets/categories/education.jpg';

const categories = [
  {
    name: 'IT',
    image: itImg,
    description: 'Technology, development, and system support roles.'
  },
  {
    name: 'Marketing',
    image: marketingImg,
    description: 'Creative and digital marketing positions.'
  },
  {
    name: 'Finance',
    image: financeImg,
    description: 'Banking, accounting, and financial services.'
  },
  {
    name: 'Sales',
    image: salesImg,
    description: 'Retail, B2B, and direct customer sales roles.'
  },
  {
    name: 'Healthcare',
    image: healthcareImg,
    description: 'Medical, nursing, and healthcare support careers.'
  },
  {
    name: 'Education',
    image: educationImg,
    description: 'Teaching, training, and academic support roles.'
  }
];

export default function Categories() {
  return (
    <section className="categories">
      <h2 className="section-title">Browse by Category</h2>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <div className="category-card" key={index}>
            <img src={cat.image} alt={cat.name} className="category-img" />
            <h3 className="category-title">{cat.name}</h3>
            <p className="category-desc">{cat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
