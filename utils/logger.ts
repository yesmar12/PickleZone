export interface LogEntry {
  timestamp: string;
  action: string;
  entityType: "committee" | "note" | "server" | "game";
  entityId: string;
  committeeId?: string;
  success: boolean;
  error?: string;
  details?: unknown;
}

export async function log(entry: Omit<LogEntry, "timestamp">): Promise<void> {
  const timestamp = new Date().toISOString();
  const logEntry: LogEntry = {
    ...entry,
    timestamp,
  };
  
  console.log(JSON.stringify(logEntry, null, 2));
}

// getLogs is removed since we're not storing logs anymore
