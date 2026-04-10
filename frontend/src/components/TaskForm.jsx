import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { taskAPI } from '../utils/API';

const TaskForm = ({ onTaskAdded, editingTask, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || '',
        priority: editingTask.priority || 'Medium',
        dueDate: editingTask.dueDate ? new Date(editingTask.dueDate).toISOString().slice(0, 16) : '',
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      let response;
      if (editingTask) {
        response = await taskAPI.update(editingTask._id, formData);
        toast.success('Task updated successfully! ✨');
      } else {
        response = await taskAPI.create(formData);
        toast.success('Task added successfully! 🎉');
      }

      if (onTaskAdded) {
        onTaskAdded(response.data.data);
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: '',
      });
      setErrors({});

      if (onCancelEdit) {
        onCancelEdit();
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to save task';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: '',
    });
    setErrors({});
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <motion.div
      className="task-form-container glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 style={{ color: 'var(--text-light)', marginBottom: '20px', fontSize: '1.5rem' }}>
        {editingTask ? '✏️ Edit Task' : '➕ Add New Task'}
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Task Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter task title..."
          />
          {errors.title && <span className="form-error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Enter task description (optional)..."
          />
        </div>

        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Due Date & Time</label>
            <input
              type="datetime-local"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="flex gap-md" style={{ marginTop: '20px' }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : editingTask ? 'Update Task' : 'Add Task'}
          </button>

          {editingTask && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default TaskForm;
