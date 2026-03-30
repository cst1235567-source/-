import type { Task } from '../types/task';

const KEY = 'taskflow_tasks';

export const loadTasks = (): Task[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(KEY, JSON.stringify(tasks));
};

export const generateId = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
