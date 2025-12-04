import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonMenuButton,
  IonButtons,
  IonButton,
} from '@ionic/react';
import './ToDo.css';

interface Task {
  id: number;
  text: string;
}

const ToDo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Task 1' },
    { id: 2, text: 'Task 2' },
    { id: 3, text: 'Task 3' },
  ]);
  const [nextId, setNextId] = useState(4);
  const [editingId, setEditingId] = useState<number | null>(null);

  const addTask = () => {
    const newTask: Task = {
      id: nextId,
      text: '',
    };
    setTasks([...tasks, newTask]);
    setEditingId(nextId);
    setNextId(nextId + 1);
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
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
      <IonHeader className="todo-header">
        <IonButtons slot="start">
          <IonMenuButton className="menu-button" />
        </IonButtons>
      </IonHeader>
      <IonContent className="todo-content">
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
                  onClick={() => removeTask(task.id)}
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
      </IonContent>
    </IonPage>
  );
};

export default ToDo;