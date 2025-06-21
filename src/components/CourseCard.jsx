import './CourseCard.css';


export default function CourseCard({ course }) {
  return (
    <div className="course-card">
      <h3 className="course-title">{course.title}</h3>
      <p className="course-provider">{course.provider}</p>
      <p className="course-duration">{course.duration}</p>
      <button className="course-btn">View Course</button>
    </div>
  );
}
