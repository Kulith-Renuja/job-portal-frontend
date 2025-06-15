export default function JobCard({ job }) {
    return (
      <div className="job-card">
        <h3>{job.title}</h3>
        <p>{job.company}</p>
        <p>Salary: ${job.salary.toLocaleString()}</p>
        <button>View Details</button>
      </div>
    );
  }