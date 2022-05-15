import pino from "pino";

import { log } from "./log";

export const handle = pino.final(log, (err, finalLogger) => {
  finalLogger.fatal(err);
  process.exitCode = 1;
  process.kill(process.pid, "SIGTERM");
});