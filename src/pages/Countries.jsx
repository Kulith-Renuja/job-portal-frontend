// pages/Countries.jsx
import { useEffect, useState } from 'react';
import { fetchCountries } from '../services/countryService';
import CountryCard from '../components/CountryCard';
import './Countries.css';

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchCountries();
        setCountries(res.data);
      } catch (err) {
        console.error('Failed to load countries:', err);
      }
    };
    load();
  }, []);

  const filtered = countries.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="countries-page">
      <section className="countries-header">
        <h1>Explore Migration Opportunities</h1>
        <p>These are the countries people migrate to most.</p>

        <div className="country-search-bar">
          <input
            type="text"
            placeholder="Search countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      <div className="countries-grid">
        {filtered.length > 0 ? (
          filtered.map((country, index) => (
            <CountryCard key={index} country={country} />
          ))
        ) : (
          <p className="no-results">No countries match your search.</p>
        )}
      </div>
    </div>
  );
}
