import { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import { fetchCourses } from '../services/courseService';
import './Courses.css';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchCourses();
        setCourses(res.data);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      }
    };
    load();
  }, []);

  const filtered = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="courses-page">
      <section className="courses-header">
        <h1>ගොඩයන Courses</h1>

        <div className="course-search-bar">
          <input
            type="text"
            placeholder="Search for a course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      <section className="courses-grid">
        {filtered.length > 0 ? (
          filtered.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#666' }}>No courses found.</p>
        )}
      </section>
    </div>
  );
}
