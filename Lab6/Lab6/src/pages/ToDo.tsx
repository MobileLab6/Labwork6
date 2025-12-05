import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonPage,
  IonMenuButton,
  IonButtons,
} from '@ionic/react';
import './ToDo.css';

interface Task {
  id: number;
  text: string;
}

// Avain, jonka alla tehtävät säilytetään localStoragessa
const TASKS_STORAGE_KEY = 'todo_tasks';

const ToDo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Task 1' },
    { id: 2, text: 'Task 2' },
    { id: 3, text: 'Task 3' },
  ]);
  const [nextId, setNextId] = useState(4);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // 1) Lue tehtävät localStoragesta kun komponentti ladataan
  useEffect(() => {
    const stored = localStorage.getItem(TASKS_STORAGE_KEY);
    if (stored) {
      try {
        const parsed: Task[] = JSON.parse(stored);
        setTasks(parsed);

        // Päivitä nextId sen mukaan, mikä id on suurin
        const maxId = parsed.reduce((max, t) => (t.id > max ? t.id : max), 0);
        setNextId(maxId + 1);
      } catch (e) {
        console.error('Error parsing tasks from localStorage', e);
      }
    }
  }, []);

  // 2) Tallenna tehtävät localStorageen aina kun tasks muuttuu
  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const newTask: Task = {
      id: nextId,
      text: '',
    };
    setTasks([...tasks, newTask]);
    setEditingId(nextId);
    setNextId(nextId + 1);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmId !== null) {
      setTasks(tasks.filter(task => task.id !== deleteConfirmId));
      setDeleteConfirmId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };

  const updateTask = (id: number, newText: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const handleTaskClick = (id: number) => {
    setEditingId(id);
  };

  const handleTaskBlur = () => {
    setEditingId(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setEditingId(null);
    }
  };

  return (
    <IonPage>
      <IonContent className="todo-content">
        <IonButtons className="menu-button-container">
          <IonMenuButton className="menu-button" />
        </IonButtons>
        <div className="todo-container">
          <h1 className="todo-title">Your To-Do List</h1>

          <div className="tasks-container">
            {tasks.map((task) => (
              <div key={task.id} className="task-item">
                {editingId === task.id ? (
                  <input
                    type="text"
                    className="task-input"
                    value={task.text}
                    onChange={(e) => updateTask(task.id, e.target.value)}
                    onBlur={handleTaskBlur}
                    onKeyPress={handleKeyPress}
                    autoFocus
                    placeholder="Enter task..."
                  />
                ) : (
                  <div
                    className={`task-text ${!task.text ? 'empty' : ''}`}
                    onClick={() => handleTaskClick(task.id)}
                  >
                    {task.text || 'Click to add a task'}
                  </div>
                )}
                <button
                  className="task-delete-btn"
                  onClick={() => handleDeleteClick(task.id)}
                >
                  X
                </button>
              </div>
            ))}
          </div>

          <button className="add-task-btn" onClick={addTask}>
            Add
          </button>
        </div>

        {deleteConfirmId !== null && (
          <div className="confirm-overlay">
            <div className="confirm-dialog">
              <p className="confirm-text">Are you sure you want to delete this task?</p>
              <div className="confirm-buttons">
                <button className="confirm-btn-yes" onClick={confirmDelete}>
                  Yes
                </button>
                <button className="confirm-btn-no" onClick={cancelDelete}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ToDo;
