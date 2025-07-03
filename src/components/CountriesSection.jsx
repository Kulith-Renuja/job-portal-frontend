import './CountriesSection.css';
import { Link } from 'react-router-dom';
import australia from '../assets/flags/australia.jpg';
import canada from '../assets/flags/canada.jpg';
import germany from '../assets/flags/germany.jpg';
import dubai from '../assets/flags/dubai.jpg';


const countries = [
  { name: 'Australia', flag: australia },
  { name: 'Canada', flag: canada },
  { name: 'Germany', flag: germany },
  { name: 'Dubai', flag: dubai },
    { name: 'United States', flag: 'https://flagcdn.com/us.svg' },
];

export default function CountriesSection() {
  return (
    <section className="countries-section">
      <h2 className="section-title">ගොඩයන Countries</h2>
      
      <div className="country-grid">
        {countries.map((country, idx) => (
          <div key={idx} className="country-card">
            <img src={country.flag} alt={country.name} className="country-flag" />
            <p className="country-name">{country.name}</p>
          </div>
        ))}
      </div>

      <div className="view-more-container">
        <Link to="/account"><button className="view-more-btn">View More Countries</button></Link>
      </div>
    </section>
  );
}
