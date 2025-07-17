import { useEffect, useState } from 'react';
import {
  fetchCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../services/courseService';
import { uploadImage } from '../services/uploadService'; // ✅ Added
import './ManageCourses.css';

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: '',
    image: null,
    subtitles: [{ title: '', content: '' }],
  });
  const [editingCourseId, setEditingCourseId] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const res = await fetchCourses();
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setCourses(sorted);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const handleChange = (e, index = null, field = null) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else if (field) {
      const updated = [...form.subtitles];
      updated[index][field] = value;
      setForm({ ...form, subtitles: updated });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addSubtitle = () => {
    setForm({
      ...form,
      subtitles: [...form.subtitles, { title: '', content: '' }],
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(id);
        loadCourses();
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = form.image;

      if (form.image instanceof File) {
        try {
          imageUrl = await uploadImage(form.image);
        } catch (uploadErr) {
          console.error('Image upload failed:', uploadErr);
          return;
        }
      }

      const payload = { ...form, image: imageUrl };

      if (editingCourseId) {
        await updateCourse(editingCourseId, payload);
      } else {
        await createCourse(payload);
      }

      resetForm();
      loadCourses();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const resetForm = () => {
    setForm({ title: '', image: null, subtitles: [{ title: '', content: '' }] });
    setEditingCourseId(null);
  };

  const handleEdit = (course) => {
    setEditingCourseId(course._id);
    setForm({
      title: course.title,
      image: course.image,
      subtitles: course.subtitles.map((s) => ({
        title: s.title,
        content: s.content,
      })),
    });
  };

  return (
    <div className="manage-courses">
      <h1 className="manage-title">Manage Courses</h1>

      <form className="course-form" onSubmit={handleSubmit}>
        <h2>{editingCourseId ? 'Edit Course' : 'Add New Course'}</h2>
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input type="file" name="image" onChange={handleChange} />

        {/* 👁️ Optional Preview */}
        {form.image && (
          <div className="image-preview">
            <img
              src={
                form.image instanceof File
                  ? URL.createObjectURL(form.image)
                  : form.image
              }
              alt="Preview"
              style={{ width: '150px', marginTop: '10px' }}
            />
          </div>
        )}

        <h3>Subtitles & Content</h3>
        {form.subtitles.map((sub, index) => (
          <div key={index} className="subtitle-group">
            <input
              type="text"
              placeholder="Subtitle Title"
              value={sub.title}
              onChange={(e) => handleChange(e, index, 'title')}
              required
            />
            <textarea
              placeholder="Subtitle Content"
              value={sub.content}
              onChange={(e) => handleChange(e, index, 'content')}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addSubtitle} className="add-subtitle">
          + Add Subtitle
        </button>
        <button type="submit" className="submit-btn">
          {editingCourseId ? 'Update Course' : 'Add Course'}
        </button>
        {editingCourseId && (
          <button type="button" onClick={resetForm} className="cancel-btn">
            Cancel
          </button>
        )}
      </form>

      <div className="course-list">
        {courses.map((course) => (
          <div key={course._id} className="course-row">
            <span>{course.title}</span>
            <div className="course-actions">
              <button onClick={() => handleEdit(course)}>Edit</button>
              <button
                className="delete"
                onClick={() => handleDelete(course._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
