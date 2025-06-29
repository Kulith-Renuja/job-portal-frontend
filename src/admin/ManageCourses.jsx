import { useState } from 'react';
import './ManageCourses.css';

export default function ManageCourses() {
const [courses, setCourses] = useState([
{
id: 1,
title: 'React Fundamentals',
image: null,
subtitles: [
{ title: 'Introduction', content: 'React basics and setup' },
{ title: 'JSX', content: 'Learn JSX syntax' },
],
},
{
id: 2,
title: 'Digital Marketing Basics',
image: null,
subtitles: [
{ title: 'SEO', content: 'Search Engine Optimization' },
{ title: 'Social Media', content: 'Channels and ads' },
],
},
]);

const [form, setForm] = useState({
title: '',
image: null,
subtitles: [{ title: '', content: '' }],
});

const handleChange = (e, index = null, field = null) => {
const { name, value, files } = e.target;
if (name === 'image') {
  setForm({ ...form, image: files[0] });
} else if (name === 'subtitle' || name === 'content') {
  const updated = [...form.subtitles];
  updated[index][field] = value;
  setForm({ ...form, subtitles: updated });
} else {
  setForm({ ...form, [name]: value });
}
};

const addSubtitle = () => {
setForm({ ...form, subtitles: [...form.subtitles, { title: '', content: '' }] });
};

const handleDelete = (id) => {
setCourses(courses.filter((c) => c.id !== id));
};

const handleSubmit = (e) => {
e.preventDefault();
const newCourse = {
...form,
id: Date.now(),
};
setCourses([...courses, newCourse]);
setForm({ title: '', image: null, subtitles: [{ title: '', content: '' }] });
};

return (
<div className="manage-courses">
<h1 className="manage-title">Manage Courses</h1>
  <div className="course-list">
    {courses.map((course) => (
      <div key={course.id} className="course-row">
        <span>{course.title}</span>
        <div className="course-actions">
          <button>Edit</button>
          <button className="delete" onClick={() => handleDelete(course.id)}>Delete</button>
        </div>
      </div>
    ))}
  </div>

  <form className="course-form" onSubmit={handleSubmit}>
    <h2>Add New Course</h2>
    <input
      type="text"
      name="title"
      placeholder="Course Title"
      value={form.title}
      onChange={handleChange}
      required
    />
    <input
      type="file"
      name="image"
      onChange={handleChange}
    />

    <h3>Subtitles & Content</h3>
    {form.subtitles.map((sub, index) => (
      <div key={index} className="subtitle-group">
        <input
          type="text"
          name="subtitle"
          placeholder="Subtitle Title"
          value={sub.title}
          onChange={(e) => handleChange(e, index, 'title')}
          required
        />
        <textarea
          name="content"
          placeholder="Subtitle Content"
          value={sub.content}
          onChange={(e) => handleChange(e, index, 'content')}
          required
        />
      </div>
    ))}

    <button type="button" onClick={addSubtitle} className="add-subtitle">+ Add Subtitle</button>

    <button type="submit" className="submit-btn">Add Course</button>
  </form>
</div>
);
}