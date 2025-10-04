// /src/company/CompanyDashboard.jsx
import Categories from './components/Categories';
import './CompanyDashboard.css';

export default function CompanyDashboard() {
  return (
    <div>
      <section className="hero">
        <h1>ජීවිතේම ගොඩයන්න</h1>
        <p>ලංකාවේ විශ්වාසවන්තම ඩිජිටල් අවකාශය.</p>
      </section>
      <Categories />
    </div>
  );
}