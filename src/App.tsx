import React, { useState, useMemo } from 'react';
import { useTasks } from './hooks/useTasks';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { TaskColumn } from './components/TaskColumn';
import { TaskModal } from './components/TaskModal';
import type { Task, Status, Priority } from './types/task';
import { COLUMNS } from './types/task';

export default function App() {
  const { tasks, addTask, updateTask, deleteTask, moveTask, stats } = useTasks();
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<Status | 'all'>('all');

  const filtered = useMemo(() => tasks.filter(t => {
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    const matchPriority = filterPriority === 'all' || t.priority === filterPriority;
    const matchStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchSearch && matchPriority && matchStatus;
  }), [tasks, search, filterPriority, filterStatus]);

  const openNew = () => { setEditTask(null); setModalOpen(true); };
  const openEdit = (task: Task) => { setEditTask(task); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditTask(null); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Header stats={stats} onNewTask={openNew} />
      <FilterBar
        search={search} onSearch={setSearch}
        priority={filterPriority} onPriority={setFilterPriority}
        status={filterStatus} onStatus={setFilterStatus}
      />
      <div style={{
        flex: 1, display: 'flex', gap: 16, padding: 20,
        overflow: 'hidden', background: 'var(--bg-primary)',
      }}>
        {COLUMNS.map(col => (
          <TaskColumn
            key={col.id}
            id={col.id}
            label={col.label}
            tasks={filtered.filter(t => t.status === col.id)}
            onEdit={openEdit}
            onDelete={deleteTask}
            onMove={moveTask}
          />
        ))}
      </div>
      {modalOpen && (
        <TaskModal
          task={editTask}
          onSave={addTask}
          onUpdate={updateTask}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
