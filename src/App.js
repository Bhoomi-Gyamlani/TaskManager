import React, { useState } from 'react';
import './App.css';
import ConfirmDialog from './ConfirmDialog'; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [newTask, setNewTask] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false); 
  const [taskToDelete, setTaskToDelete] = useState(null); // Track the task to delete

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), title: newTask, status: 'To Do' }]);
      setNewTask('');
    }
  };

  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: task.status === 'To Do' ? 'Done' : 'To Do' } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const deleteAllTasks = () => {
    setTasks([]); // Clear all tasks
  };

  const openDeleteDialog = (task) => {
    setTaskToDelete(task);
    setDialogOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id); // Delete the task
    }
    setDialogOpen(false); 
  };

  const cancelDelete = () => {
    // Close the dialog without deleting
    setDialogOpen(false); 
  };

  const filteredTasks =
    filter === 'All'
      ? tasks
      : tasks.filter((task) => task.status === filter);

  return (
    <div className="App">
      <header>Task Manager</header>

      {/*  Add Task */}
      <div className="task-input">
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      
      <div className="tabs-container">
        <button
          className={`tab ${filter === 'To Do' ? 'active' : ''}`}
          onClick={() => setFilter('To Do')}
        >
          <span className="material-icons">notes</span> To Do (
          {tasks.filter((task) => task.status === 'To Do').length})
        </button>
        <button
          className={`tab ${filter === 'Done' ? 'active' : ''}`}
          onClick={() => setFilter('Done')}
        >
          <span className="material-icons">check_circle</span> Done (
          {tasks.filter((task) => task.status === 'Done').length})
        </button>
        <button
          className={`tab ${filter === 'All' ? 'active' : ''}`}
          onClick={() => setFilter('All')}
        >
          <span className="material-icons">menu</span> All ({tasks.length})
        </button>
      </div>

      {/* Task Display Section */}
      <div className="task-container">
        {filteredTasks.map((task) => (
          <div key={task.id} className="task-box">
            <div className="task-title">
              <input
                type="checkbox"
                checked={task.status === 'Done'}
                onChange={() => toggleTaskStatus(task.id)}
              />
              {task.title}
            </div>
            <div className="buttons-container">
              <button
                className="delete-btn"
                onClick={() => openDeleteDialog(task)} 
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {filteredTasks.length === 0 && (
          <div className="no-tasks">No tasks to show</div>
        )}
         {filter === 'All' && tasks.length > 0 && (
        <div className="delete-all-container">
          <button onClick={deleteAllTasks} className="delete-all-btn">
            Delete All
          </button>
        </div>
      )}

      </div>

      {/* Confirmation for Task Deletion */}
      <ConfirmDialog
        open={dialogOpen}
        onClose={cancelDelete} 
        onConfirm={confirmDelete} // Confirm deletion
        message="Are you sure you want to delete this task?"
      />
    </div>
  );
}

export default App;
