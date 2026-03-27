class TodoApp {
    constructor() {
        this.todos = [];
        this.apiBase = '/api/todos';
        this.init();
    }

    init() {
        this.loadTodos();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const form = document.getElementById('todoForm');
        const input = document.getElementById('todoInput');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTodo();
        });

        // Add some keyboard shortcuts
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                input.value = '';
                input.blur();
            }
        });
    }

    async loadTodos() {
        try {
            const response = await fetch(this.apiBase);
            if (!response.ok) {
                throw new Error('Failed to load todos');
            }
            
            this.todos = await response.json();
            this.renderTodos();
        } catch (error) {
            this.showError('Failed to load todos. Please try again.');
            console.error('Error loading todos:', error);
        }
    }

    async addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();

        if (!text) {
            input.focus();
            return;
        }

        try {
            const response = await fetch(this.apiBase, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                throw new Error('Failed to add todo');
            }

            const newTodo = await response.json();
            this.todos.push(newTodo);
            this.renderTodos();
            
            input.value = '';
            input.focus();
            
            this.clearError();
        } catch (error) {
            this.showError('Failed to add todo. Please try again.');
            console.error('Error adding todo:', error);
        }
    }

    async toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        try {
            const response = await fetch(`${this.apiBase}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: !todo.completed }),
            });

            if (!response.ok) {
                throw new Error('Failed to update todo');
            }

            const updatedTodo = await response.json();
            const index = this.todos.findIndex(t => t.id === id);
            this.todos[index] = updatedTodo;
            this.renderTodos();
            
            this.clearError();
        } catch (error) {
            this.showError('Failed to update todo. Please try again.');
            console.error('Error updating todo:', error);
        }
    }

    async deleteTodo(id) {
        if (!confirm('Are you sure you want to delete this todo?')) {
            return;
        }

        try {
            const response = await fetch(`${this.apiBase}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete todo');
            }

            this.todos = this.todos.filter(t => t.id !== id);
            this.renderTodos();
            
            this.clearError();
        } catch (error) {
            this.showError('Failed to delete todo. Please try again.');
            console.error('Error deleting todo:', error);
        }
    }

    renderTodos() {
        const todoList = document.getElementById('todoList');
        
        if (this.todos.length === 0) {
            todoList.innerHTML = `
                <div class="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 11l3 3L22 4"></path>
                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
                    </svg>
                    <h3>No todos yet</h3>
                    <p>Add your first todo to get started!</p>
                </div>
            `;
            return;
        }

        todoList.innerHTML = this.todos.map(todo => `
            <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <input 
                    type="checkbox" 
                    class="todo-checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    onchange="todoApp.toggleTodo(${todo.id})"
                >
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <button class="delete-btn" onclick="todoApp.deleteTodo(${todo.id})">
                    Delete
                </button>
            </div>
        `).join('');
    }

    showError(message) {
        const errorContainer = document.getElementById('errorContainer');
        errorContainer.innerHTML = `<div class="error">${message}</div>`;
        
        // Auto-hide error after 5 seconds
        setTimeout(() => {
            this.clearError();
        }, 5000);
    }

    clearError() {
        const errorContainer = document.getElementById('errorContainer');
        errorContainer.innerHTML = '';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is loaded
let todoApp;
document.addEventListener('DOMContentLoaded', () => {
    todoApp = new TodoApp();
});

// Make todoApp globally accessible for inline event handlers
window.todoApp = todoApp;
