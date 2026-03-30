import React from 'react';
import type { Priority, Status } from '../types/task';

interface Props {
  search: string;
  onSearch: (v: string) => void;
  priority: Priority | 'all';
  onPriority: (v: Priority | 'all') => void;
  status: Status | 'all';
  onStatus: (v: Status | 'all') => void;
}

export const FilterBar: React.FC<Props> = ({ search, onSearch, priority, onPriority, status, onStatus }) => (
  <div style={{
    display: 'flex',
    gap: 10,
    padding: '12px 24px',
    background: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--border)',
    flexShrink: 0,
  }}>
    <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
      <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}
        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
      </svg>
      <input
        value={search}
        onChange={e => onSearch(e.target.value)}
        placeholder="Search tasks..."
        style={{ paddingLeft: 32, fontSize: 13 }}
      />
    </div>

    <select value={priority} onChange={e => onPriority(e.target.value as Priority | 'all')} style={{ width: 'auto', fontSize: 13, padding: '8px 28px 8px 10px' }}>
      <option value="all">All Priorities</option>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>

    <select value={status} onChange={e => onStatus(e.target.value as Status | 'all')} style={{ width: 'auto', fontSize: 13, padding: '8px 28px 8px 10px' }}>
      <option value="all">All Status</option>
      <option value="todo">Todo</option>
      <option value="in-progress">In Progress</option>
      <option value="done">Done</option>
    </select>
  </div>
);
