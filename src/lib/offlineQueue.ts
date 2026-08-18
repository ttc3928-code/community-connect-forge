export interface QueuedEntry {
  title: string;
  content: string;
  category: string;
  queuedAt: string;
}

const QUEUE_KEY = 'sos_offline_journal_queue';

export function readQueue(): QueuedEntry[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function queueEntry(entry: Omit<QueuedEntry, 'queuedAt'>) {
  try {
    const next = [...readQueue(), { ...entry, queuedAt: new Date().toISOString() }];
    localStorage.setItem(QUEUE_KEY, JSON.stringify(next));
    return true;
  } catch {
    return false;
  }
}

export function clearQueue() {
  try {
    localStorage.removeItem(QUEUE_KEY);
  } catch {
    /* ignore */
  }
}
