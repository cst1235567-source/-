import React, { useState } from 'react';
import type { Task, Status } from '../types/task';
import { TaskCard } from './TaskCard';

interface Props {
  id: Status;
  label: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onMove: (taskId: string, status: Status) => void;
}

const columnAccent: Record<Status, string> = {
  'todo': 'var(--text-muted)',
  'in-progress': 'var(--yellow)',
  'done': 'var(--green)',
};

export const TaskColumn: React.FC<Props> = ({ id, label, tasks, onEdit, onDelete, onMove }) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) onMove(taskId, id);
  };

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      style={{
        flex: 1,
        minWidth: 0,
        background: dragOver ? 'rgba(99,102,241,0.05)' : 'var(--bg-secondary)',
        border: `1px solid ${dragOver ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 'var(--radius)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'var(--transition)',
        maxHeight: '100%',
      }}
    >
      <div style={{
        padding: '14px 16px 12px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexShrink: 0,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: columnAccent[id], flexShrink: 0 }} />
        <span style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.3px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{
          marginLeft: 'auto', background: 'var(--bg-hover)', color: 'var(--text-muted)',
          borderRadius: 20, padding: '1px 8px', fontSize: 11, fontWeight: 700,
        }}>{tasks.length}</span>
      </div>

      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', flex: 1 }}>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onDragStart={handleDragStart} />
        ))}
        {tasks.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 12, padding: '32px 0' }}>
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
};
