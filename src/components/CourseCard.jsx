// components/CourseCard.jsx
import './CourseCard.css';
import { Link } from 'react-router-dom';

export default function CourseCard({ course }) {
  const firstSubtitle = course.subtitles?.[0]?.title || '';

  return (
    <div className="course-card">
      <div>
        <h3 className="course-title">{course.title}</h3>
        {firstSubtitle && <p className="course-provider">{firstSubtitle}</p>}
      </div>
      <br />
      <br />
      <br />
      <Link to={`/courses/${course._id}`}>
        <button className="course-btn">View Course</button>
      </Link>
    </div>
  );
}

