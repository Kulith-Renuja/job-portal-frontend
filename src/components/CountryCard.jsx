import './CountryCard.css';
import { Link } from 'react-router-dom';

export default function CountryCard({ country }) {
  return (
    <Link to={`/countries/${country._id}`} className="country-card">
      <img src={country.image} alt={country.title} className="country-flag" />
      <p className="country-name">{country.title}</p>
    </Link>
  );
}
