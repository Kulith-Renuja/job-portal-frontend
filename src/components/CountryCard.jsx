// components/CountryCard.jsx
import './CountryCard.css';

export default function CountryCard({ country }) {
  return (
    <div className="country-card">
      <img src={country.image} alt={country.title} className="country-flag" />
      <p className="country-name">{country.title}</p>
    </div>
  );
}
