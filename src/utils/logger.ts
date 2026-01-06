import fs from "fs";
import path from "path";

const LOG_DIR = path.join(process.cwd(), "logs");

// Ensure logs directory exists only in development or if possible
try {
  if (process.env.NODE_ENV === "development" && !fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
} catch (error) {
  console.warn("Could not create logs directory (expected in serverless/production):", error);
}

type LogLevel = "info" | "success" | "warning" | "error";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  stack?: string;
}

class Logger {
  private getLogFileName(): string {
    const date = new Date().toISOString().split("T")[0];
    return path.join(LOG_DIR, `${date}.log`);
  }

  private formatLog(entry: LogEntry): string {
    const { timestamp, level, message, data, stack } = entry;
    let log = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

    if (data) {
      log += `\nData: ${JSON.stringify(data, null, 2)}`;
    }

    if (stack) {
      log += `\nStack: ${stack}`;
    }

    return log + "\n\n";
  }

  private writeLog(entry: LogEntry): void {
    // In production/serverless, stick to console logging
    if (process.env.NODE_ENV === "production") {
      const emoji = {
        info: "ℹ️",
        success: "✅",
        warning: "⚠️",
        error: "❌",
      };
      // Use console methods for better visibility in cloud logs
      const consoleMethod = entry.level === 'error' ? console.error :
        entry.level === 'warning' ? console.warn : console.log;

      consoleMethod(`${emoji[entry.level]} ${entry.message}`, entry.data || "");
      if (entry.stack) console.error(entry.stack);
      return;
    }

    // Development: Try file logging + console
    try {
      if (process.env.NODE_ENV === "development") {
        const logFile = this.getLogFileName();
        const formattedLog = this.formatLog(entry);
        fs.appendFileSync(logFile, formattedLog, "utf8");
      }
    } catch (error) {
      // Fallback if file write fails (e.g. permission issues even in dev)
      console.error("Failed to write to log file:", error);
    }

    // Always log to console in development too
    if (process.env.NODE_ENV === "development") {
      const emoji = {
        info: "ℹ️",
        success: "✅",
        warning: "⚠️",
        error: "❌",
      };
      console.log(`${emoji[entry.level]} ${entry.message}`, entry.data || "");
    }
  }

  info(message: string, data?: any): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: "info",
      message,
      data,
    });
  }

  success(message: string, data?: any): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: "success",
      message,
      data,
    });
  }

  warning(message: string, data?: any): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: "warning",
      message,
      data,
    });
  }

  error(message: string, error?: any): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: "error",
      message,
      data: error?.message || error,
      stack: error?.stack,
    });
  }

  // API specific logger
  apiRequest(method: string, url: string, data?: any): void {
    this.info(`API Request: ${method} ${url}`, data);
  }

  apiResponse(method: string, url: string, status: number, data?: any): void {
    if (status >= 200 && status < 300) {
      this.success(`API Response: ${method} ${url} - ${status}`, data);
    } else if (status >= 400) {
      this.error(`API Error: ${method} ${url} - ${status}`, data);
    }
  }

  // Database specific logger
  dbQuery(query: string, params?: any): void {
    this.info(`DB Query: ${query}`, params);
  }

  dbSuccess(operation: string, data?: any): void {
    this.success(`DB Operation: ${operation}`, data);
  }

  dbError(operation: string, error: any): void {
    this.error(`DB Error: ${operation}`, error);
  }

  // Auth specific logger
  authSuccess(action: string, user?: any): void {
    this.success(`Auth: ${action}`, { userId: user?.id, email: user?.email });
  }

  authFailed(action: string, reason: string): void {
    this.warning(`Auth Failed: ${action} - ${reason}`);
  }
}

export const logger = new Logger();
export default logger;
