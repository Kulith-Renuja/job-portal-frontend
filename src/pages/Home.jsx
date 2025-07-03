import Categories from '../components/Categories';
import JobCard from '../components/JobCard';
import StoryCard from '../components/StoryCard';
import CourseCard from '../components/CourseCard';
import firstImg from '../assets/stories/1.jpg';
import scondImg from '../assets/stories/2.jpg';
import thirdImg from '../assets/stories/3.jpg';
import MoreButton from '../components/MoreButton';
import CountriesSection from '../components/CountriesSection';




export default function Home() {
  const jobs = [
    {
      title: 'Frontend Developer',
      company: 'TechNova',
      location: 'Colombo, Sri Lanka',
    },
    {
      title: 'Marketing Specialist',
      company: 'BrightAds',
      location: 'Remote',
    },
    {
      title: 'UI/UX Designer',
      company: 'Designify',
      location: 'Galle',
    }
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <h1>ජීවිතේම ගොඩයන්න</h1>
        <p>Explore top categories, jobs, stories and more.</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for jobs, titles, or keywords..."
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>
      </section>

      <Categories />
      <CountriesSection />

      <section className="job-listings">
        <h2 className="section-title">ගොඩයන Jobs</h2>
        <div className="job-grid">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
        <MoreButton to="/jobs" />
      </section>

        <section className="courses">
            <h2 className="section-title">ගොඩයන Courses</h2>
            <div className="courses-grid">
                {[
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
                }
                ].map((course, index) => (
                <CourseCard key={index} course={course} />
                ))}
            </div>
            <MoreButton to="/courses" />
            </section>
            <section className="stories">
              <h2 className="section-title">ගොඩයන  Stories</h2>
              <div className="stories-grid">
                  {[
                  {
                      title: 'How I Landed My First Tech Job',
                      description: 'Step-by-step journey from student to software developer.',
                      image: firstImg
                  },
                  {
                      title: 'Top Resume Tips for 2025',
                      description: 'What hiring managers want to see (and what they don’t).',
                      image: scondImg
                  },
                  {
                      title: 'How to Work Remotely',
                      description: 'Practical advice to stay productive and balanced.',
                      image: thirdImg
                  }
                  ].map((story, index) => (
                  <StoryCard key={index} story={story} />
                  ))}
              </div>
              <MoreButton to="/stories" />
              </section>
    </div>
  );
}
