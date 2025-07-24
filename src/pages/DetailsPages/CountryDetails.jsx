import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCountries } from '../../services/countryService';
import './CountryDetails.css';

export default function CountryDetails() {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCountry = async () => {
      try {
        const res = await fetchCountries();
        const match = res.data.find((c) => c._id === id);
        setCountry(match);
      } catch (err) {
        console.error('Error loading country:', err);
      } finally {
        setLoading(false);
      }
    };
    loadCountry();
  }, [id]);

  if (loading) return <div className="country-details">Loading...</div>;
  if (!country) return <div className="country-details">Country not found.</div>;

  return (
    <div className="country-details">
      <h1 className="country-title">{country.title}</h1>
      {country.subtitles && country.subtitles.map((item, index) => (
        <div key={index} className="country-section">
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}
