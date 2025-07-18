import './CourseCard.css';
import { Link } from 'react-router-dom';

export default function CourseCard({ course }) {
  return (
    <div className="course-card">
      <h3 className="course-title">{course.title}</h3>
      <p className="course-provider">{course.provider}</p>
      <p className="course-duration">{course.duration}</p>
      <Link to={`/courses/${course._id}`}>
        <button className="course-btn">View Course</button>
      </Link>
    </div>
  );
}
