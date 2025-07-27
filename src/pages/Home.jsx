import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import JobCard from '../components/JobCard';
import StoryCard from '../components/StoryCard';
import CourseCard from '../components/CourseCard';
import CountryCard from '../components/CountryCard';
import MoreButton from '../components/MoreButton';
import {
  fetchJobs
} from '../services/jobService';
import {
  fetchCourses
} from '../services/courseService';
import {
  fetchStories
} from '../services/storyService';
import {
  fetchCountries
} from '../services/countryService';
import './Home.css';

export default function Home() {
  const [search, setSearch] = useState('');
  const [jobs, setJobs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [stories, setStories] = useState([]);
  const [countries, setCountries] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [jobRes, courseRes, storyRes, countryRes] = await Promise.all([
          fetchJobs(),
          fetchCourses(),
          fetchStories(),
          fetchCountries(),
        ]);
        setJobs(jobRes.data.slice(0, 3));
        setCourses(courseRes.data.slice(0, 3));
        setStories(storyRes.data.slice(0, 3));
        setCountries(countryRes.data.slice(0, 6));
      } catch (err) {
        console.error('Failed to fetch home data:', err);
      }
    };
    loadData();
  }, []);

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(search)}`);
    } else {
      navigate('/jobs');
    }
  };

  return (
    <div className="home-page">
      <section className="hero">
        <h1>ජීවිතේම ගොඩයන්න</h1>
        <p>ලංකාවේ විශ්වාසවන්තම ඩිජිටල් අවකාශය.</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for jobs, titles, or keywords..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
      </section>

      <Categories />

      <section className="countries-section">
        <h2 className="section-title">ගොඩයන Countries</h2>
        <div className="country-grid">
          {countries.map((country) => (
            <CountryCard key={country._id} country={country} />
          ))}
        </div>
        <div className="view-more-container">
          <MoreButton to="/countries" />
        </div>
      </section>

      <section className="job-listings">
        <h2 className="section-title">ගොඩයන Jobs</h2>
        <div className="job-grid">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
        <MoreButton to="/jobs" />
      </section>

      <section className="courses">
        <h2 className="section-title">ගොඩයන Courses</h2>
        <div className="courses-grid">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
        <MoreButton to="/courses" />
      </section>

      <section className="stories">
        <h2 className="section-title">ගොඩයන Stories</h2>
        <div className="stories-grid">
          {stories.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
        <MoreButton to="/stories" />
      </section>
    </div>
  );
}
