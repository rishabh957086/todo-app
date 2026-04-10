import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { taskAPI } from '../utils/API';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';

const Dashboard = ({ darkMode, toggleDarkMode }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const tasksPerPage = 10;

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getAll({
        page: currentPage,
        limit: tasksPerPage,
      });
      setTasks(response.data.data);
      setTotalPages(response.data.pages);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Reminder system - check every minute
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      tasks.forEach(task => {
        if (task.dueDate && !task.completed) {
          const dueDate = new Date(task.dueDate);
          const timeDiff = dueDate - now;

          // Reminder: 15 minutes before due
          if (timeDiff > 0 && timeDiff <= 15 * 60 * 1000) {
            toast.warning(`⏰ Task "${task.title}" is due in 15 minutes!`);
          }

          // Warning: past due date
          if (timeDiff < 0 && timeDiff > -60 * 60 * 1000) { // Only show within 1 hour of overdue
            toast.error(`⚠️ Task "${task.title}" is overdue!`);
          }
        }
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [tasks]);

  // Handle task added/updated
  const handleTaskAdded = () => {
    fetchTasks();
  };

  // Handle task update
  const handleTaskUpdate = (updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  // Handle task delete
  const handleTaskDelete = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
  };

  // Handle edit
  const handleEdit = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  // Handle drag end
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  // Filter and sort tasks
  const getFilteredTasks = () => {
    let filtered = [...tasks];

    // Search
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by priority
    if (filterPriority !== 'all') {
      filtered = filtered.filter(task => task.priority === filterPriority);
    }

    // Filter by status
    if (filterStatus === 'completed') {
      filtered = filtered.filter(task => task.completed);
    } else if (filterStatus === 'pending') {
      filtered = filtered.filter(task => !task.completed);
    }

    // Sort
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'priority') {
      const priorityOrder = { High: 0, Medium: 1, Low: 2 };
      filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortBy === 'dueDate') {
      filtered.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    }

    return filtered;
  };

  // Stats
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && !t.completed).length,
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="dashboard">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="container">
        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="dashboard-title">Welcome, {user?.name}! 👋</h1>
          <p className="dashboard-subtitle">Manage your tasks and stay productive</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stats-card glass">
            <div className="stats-number">{stats.total}</div>
            <div className="stats-label">Total Tasks</div>
          </div>
          <div className="stats-card glass">
            <div className="stats-number" style={{ color: 'var(--success)' }}>{stats.completed}</div>
            <div className="stats-label">Completed</div>
          </div>
          <div className="stats-card glass">
            <div className="stats-number" style={{ color: 'var(--warning)' }}>{stats.pending}</div>
            <div className="stats-label">Pending</div>
          </div>
          <div className="stats-card glass">
            <div className="stats-number" style={{ color: 'var(--danger)' }}>{stats.overdue}</div>
            <div className="stats-label">Overdue</div>
          </div>
        </motion.div>

        {/* Task Form */}
        <motion.div
          style={{ marginTop: '30px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TaskForm
            onTaskAdded={handleTaskAdded}
            editingTask={editingTask}
            onCancelEdit={handleCancelEdit}
          />
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          className="filters-container glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input search-input"
          />
          <div className="filter-controls">
            <div>
              <label className="form-label">Priority</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="form-select"
              >
                <option value="all">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label className="form-label">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="form-select"
              >
                <option value="all">All Tasks</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div>
              <label className="form-label">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="priority">Priority</option>
                <option value="dueDate">Due Date</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Task List */}
        <motion.div
          className="task-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {loading ? (
            <div className="spinner"></div>
          ) : filteredTasks.length === 0 ? (
            <div className="empty-state glass">
              <div className="empty-state-icon">📝</div>
              <div className="empty-state-text">No tasks found</div>
              <p className="text-muted">
                {searchTerm || filterPriority !== 'all' || filterStatus !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Add your first task to get started!'}
              </p>
            </div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="tasks">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <AnimatePresence>
                      {filteredTasks.map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <TaskCard
                              task={task}
                              onTaskUpdate={handleTaskUpdate}
                              onTaskDelete={handleTaskDelete}
                              onEdit={handleEdit}
                              provided={provided}
                            />
                          )}
                        </Draggable>
                      ))}
                    </AnimatePresence>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            className="pagination glass"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
