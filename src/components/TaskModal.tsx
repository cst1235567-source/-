import React, { useState, useEffect } from 'react';
import type { Task, Priority, Status } from '../types/task';

interface Props {
  task: Task | null;
  onSave: (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdate: (id: string, data: Partial<Task>) => void;
  onClose: () => void;
}

const empty = (): Omit<Task, 'id' | 'createdAt' | 'updatedAt'> => ({
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  tags: [],
  dueDate: null,
});

export const TaskModal: React.FC<Props> = ({ task, onSave, onUpdate, onClose }) => {
  const [form, setForm] = useState(empty());
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (task) {
      setForm({ title: task.title, description: task.description, status: task.status,
        priority: task.priority, tags: task.tags, dueDate: task.dueDate });
    } else {
      setForm(empty());
    }
    setTagInput('');
  }, [task]);

  const set = (key: string, value: unknown) => setForm(f => ({ ...f, [key]: value }));

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) set('tags', [...form.tags, t]);
    setTagInput('');
  };

  const removeTag = (t: string) => set('tags', form.tags.filter(x => x !== t));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    if (task) onUpdate(task.id, form);
    else onSave(form);
    onClose();
  };

  const label = (text: string) => (
    <label style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 600,
      color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{text}</label>
  );

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, backdropFilter: 'blur(3px)',
      }}
    >
      <form
        onClick={e => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 14, padding: 28, width: '100%', maxWidth: 500,
          boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', gap: 18,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: 16 }}>{task ? 'Edit Task' : 'New Task'}</span>
          <button type="button" onClick={onClose}
            style={{ color: 'var(--text-muted)', fontSize: 18, lineHeight: 1 }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            ✕
          </button>
        </div>

        <div>
          {label('Title')}
          <input value={form.title} onChange={e => set('title', e.target.value)}
            placeholder="Task title..." required autoFocus />
        </div>

        <div>
          {label('Description')}
          <textarea value={form.description} onChange={e => set('description', e.target.value)}
            placeholder="Optional description..." rows={3}
            style={{ resize: 'vertical', minHeight: 72 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            {label('Priority')}
            <select value={form.priority} onChange={e => set('priority', e.target.value as Priority)}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div>
            {label('Status')}
            <select value={form.status} onChange={e => set('status', e.target.value as Status)}>
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <div>
          {label('Due Date')}
          <input type="date" value={form.dueDate ?? ''}
            onChange={e => set('dueDate', e.target.value || null)}
            style={{ colorScheme: 'dark' }} />
        </div>

        <div>
          {label('Tags')}
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <input value={tagInput} onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
              placeholder="Add tag and press Enter..." />
            <button type="button" onClick={addTag}
              style={{
                background: 'var(--bg-hover)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', padding: '8px 14px',
                color: 'var(--text-secondary)', fontWeight: 600, flexShrink: 0,
              }}>Add</button>
          </div>
          {form.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {form.tags.map(t => (
                <span key={t} className="tag" style={{ cursor: 'pointer' }}
                  onClick={() => removeTag(t)}>
                  {t} <span style={{ opacity: 0.5 }}>✕</span>
                </span>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
          <button type="button" onClick={onClose}
            style={{
              padding: '9px 20px', borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-hover)', border: '1px solid var(--border)',
              color: 'var(--text-secondary)', fontWeight: 600,
            }}>Cancel</button>
          <button type="submit"
            style={{
              padding: '9px 24px', borderRadius: 'var(--radius-sm)',
              background: 'var(--accent)', color: '#fff', fontWeight: 700,
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}>
            {task ? 'Save Changes' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};
