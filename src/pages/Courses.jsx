import CourseCard from '../components/CourseCard';
import './Courses.css';

export default function Courses() {
  const courses = [
    {
      title: 'Full-Stack Web Development',
      provider: 'Coursera by Meta',
      duration: '6 Months'
    },
    {
      title: 'Digital Marketing Basics',
      provider: 'Google Digital Garage',
      duration: '2 Weeks'
    },
    {
      title: 'UI/UX Design Foundations',
      provider: 'Skillshare',
      duration: '1 Month'
    },
    {
      title: 'Full-Stack Web Development',
      provider: 'Coursera by Meta',
      duration: '6 Months'
    },
    {
      title: 'Digital Marketing Basics',
      provider: 'Google Digital Garage',
      duration: '2 Weeks'
    }
    // Add more later from backend
  ];

  return (
    <div className="courses-page">
      <section className="courses-header">
        <h1>Courses to Build Your Future</h1>
        <p>Explore practical, career-focused courses in tech, marketing, and more.</p>

        <div className="course-search-bar">
          <input type="text" placeholder="Search for a course..." />
          <button>Search</button>
        </div>
      </section>

      <section className="courses-grid">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </section>
    </div>
  );
}
