import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { taskAPI } from '../utils/API';

const TaskCard = ({ task, onTaskUpdate, onTaskDelete, onEdit, provided }) => {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleToggleComplete = async () => {
    try {
      const response = await taskAPI.update(task._id, {
        completed: !task.completed,
      });
      onTaskUpdate(response.data.data);
      toast.success(task.completed ? 'Task marked as pending' : 'Task completed! 🎉');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.delete(task._id);
        onTaskDelete(task._id);
        toast.success('Task deleted successfully! 🗑️');
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Low':
        return 'task-priority-low';
      case 'Medium':
        return 'task-priority-medium';
      case 'High':
        return 'task-priority-high';
      default:
        return 'task-priority-medium';
    }
  };

  return (
    <motion.div
      ref={provided?.innerRef}
      {...provided?.dragHandleProps}
      className={`task-card glass ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="task-header">
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          {provided && <span className="drag-handle">⋮⋮</span>}
          <h3 className="task-title">{task.title}</h3>
        </div>
        <span className={`task-priority ${getPriorityClass(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        {task.dueDate && (
          <span className={`task-due-date ${isOverdue ? 'overdue' : ''}`}>
            📅 {formatDate(task.dueDate)}
            {isOverdue && ' ⚠️'}
          </span>
        )}
        <span style={{ color: 'var(--text-secondary)' }}>
          {task.completed ? '✅ Completed' : '⏳ Pending'}
        </span>
      </div>

      <div className="task-actions">
        <button
          className={`btn btn-small ${task.completed ? 'btn-secondary' : 'btn-success'}`}
          onClick={handleToggleComplete}
        >
          {task.completed ? '↩️ Mark Pending' : '✓ Mark Complete'}
        </button>
        <button
          className="btn btn-small btn-secondary"
          onClick={() => onEdit(task)}
        >
          ✏️ Edit
        </button>
        <button
          className="btn btn-small btn-danger"
          onClick={handleDelete}
        >
          🗑️ Delete
        </button>
      </div>
    </motion.div>
  );
};

export default TaskCard;
