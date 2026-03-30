import { useState, useCallback } from 'react';
import type { Task, Status, Priority } from '../types/task';
import { loadTasks, saveTasks, generateId } from '../utils/storage';

const persist = (tasks: Task[]) => { saveTasks(tasks); return tasks; };

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

  const addTask = useCallback((data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    setTasks(prev => persist([...prev, {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }]));
  }, []);

  const updateTask = useCallback((id: string, data: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks(prev => persist(prev.map(t =>
      t.id === id ? { ...t, ...data, updatedAt: new Date().toISOString() } : t
    )));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => persist(prev.filter(t => t.id !== id)));
  }, []);

  const moveTask = useCallback((id: string, status: Status) => {
    setTasks(prev => persist(prev.map(t =>
      t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t
    )));
  }, []);

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
    overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done').length,
  };

  return { tasks, addTask, updateTask, deleteTask, moveTask, stats };
};
