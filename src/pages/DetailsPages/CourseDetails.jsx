import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourses } from '../../services/courseService';
import './CourseDetails.css';

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const res = await fetchCourses();
        const found = res.data.find(c => c._id === id);
        setCourse(found);
      } catch (err) {
        console.error('Failed to fetch course:', err);
      } finally {
        setLoading(false);
      }
    };
    loadCourse();
  }, [id]);

  if (loading) return <div className="course-details">Loading...</div>;
  if (!course) return <div className="course-details">Course not found.</div>;

  return (
    <div className="course-details">
      <h1 className="course-title">{course.title}</h1>
      <p className="course-provider">{course.provider}</p>
      <p className="course-duration">{course.duration}</p>
      {course.image && (
        <img src={course.image} alt={course.title} className="course-image" />
      )}

      <div className="course-subtitles">
        {course.subtitles.map((sub, idx) => (
          <div key={idx} className="subtitle-block">
            <h3>{sub.title}</h3>
            <p><pre style={{ whiteSpace: 'pre-wrap' }}>{sub.content}</pre></p>
          </div>
        ))}
      </div>
    </div>
  );
}
