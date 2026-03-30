import React from 'react';
import type { Task } from '../types/task';

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
}

const priorityClass: Record<string, string> = {
  high: 'badge badge-high',
  medium: 'badge badge-medium',
  low: 'badge badge-low',
};

const priorityDot: Record<string, string> = {
  high: 'var(--red)',
  medium: 'var(--yellow)',
  low: 'var(--blue)',
};

export const TaskCard: React.FC<Props> = ({ task, onEdit, onDelete, onDragStart }) => {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div
      draggable
      onDragStart={e => onDragStart(e, task.id)}
      onClick={() => onEdit(task)}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '14px 14px 12px',
        cursor: 'grab',
        transition: 'var(--transition)',
        borderLeft: `3px solid ${priorityDot[task.priority]}`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--bg-hover)';
        e.currentTarget.style.borderColor = 'var(--accent)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'var(--bg-card)';
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.borderLeftColor = priorityDot[task.priority];
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <span style={{ fontWeight: 600, fontSize: 13.5, lineHeight: 1.4, flex: 1, marginRight: 8 }}>{task.title}</span>
        <button
          onClick={e => { e.stopPropagation(); onDelete(task.id); }}
          style={{ color: 'var(--text-muted)', padding: '0 2px', lineHeight: 1, flexShrink: 0 }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >✕</button>
      </div>

      {task.description && (
        <p style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 10, lineHeight: 1.5,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {task.description}
        </p>
      )}

      {task.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
          {task.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className={priorityClass[task.priority]}>{task.priority}</span>
        {task.dueDate && (
          <span style={{ fontSize: 11, color: isOverdue ? 'var(--red)' : 'var(--text-muted)' }}>
            {isOverdue ? '⚠ ' : ''}{formatDate(task.dueDate)}
          </span>
        )}
      </div>
    </div>
  );
};
