import './About.css';

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About JobPortal</h1>
        <p>
          JobPortal is a modern platform that connects job seekers with the right career opportunities.
          Our mission is to empower individuals to reach their full potential by making job discovery fast,
          relevant, and reliable.
        </p>
      </section>

      <section className="about-stats">
        <div className="stat-card">
          <h2>50K+</h2>
          <p>Active Jobs</p>
        </div>
        <div className="stat-card">
          <h2>10K+</h2>
          <p>Companies</p>
        </div>
        <div className="stat-card">
          <h2>100K+</h2>
          <p>Success Stories</p>
        </div>
      </section>

      <section className="about-values">
        <h2>Why Choose Us</h2>
        <ul>
          <li>🔍 Easy and fast job search with category filters</li>
          <li>📱 Mobile-friendly and user-centric design</li>
          <li>🛡️ Secure and reliable user accounts</li>
          <li>📢 Real-time job posting from verified companies</li>
        </ul>
      </section>
    </div>
  );
}
