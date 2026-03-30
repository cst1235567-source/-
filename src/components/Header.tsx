import React from 'react';

interface Stats {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
  overdue: number;
}

interface Props {
  stats: Stats;
  onNewTask: () => void;
}

export const Header: React.FC<Props> = ({ stats, onNewTask }) => (
  <header style={{
    background: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--border)',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    height: 60,
    flexShrink: 0,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 16 }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
      <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.3px' }}>TaskFlow</span>
    </div>

    <div style={{ display: 'flex', gap: 20, flex: 1 }}>
      {[
        { label: 'Total', value: stats.total, color: 'var(--text-primary)' },
        { label: 'Todo', value: stats.todo, color: 'var(--text-secondary)' },
        { label: 'In Progress', value: stats.inProgress, color: 'var(--yellow)' },
        { label: 'Done', value: stats.done, color: 'var(--green)' },
        ...(stats.overdue > 0 ? [{ label: 'Overdue', value: stats.overdue, color: 'var(--red)' }] : []),
      ].map(s => (
        <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: s.color, fontWeight: 700, fontSize: 18, lineHeight: 1 }}>{s.value}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{s.label}</span>
        </div>
      ))}
    </div>

    <button
      onClick={onNewTask}
      style={{
        background: 'var(--accent)',
        color: '#fff',
        padding: '8px 16px',
        borderRadius: 'var(--radius-sm)',
        fontWeight: 600,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-hover)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
    >
      <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> New Task
    </button>
  </header>
);
