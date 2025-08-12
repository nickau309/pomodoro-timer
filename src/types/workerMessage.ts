import { z } from "zod/v4-mini";
import { WORKER_MESSAGE_SCHEMA } from "../schema/workerMessage";

export type WorkerMessage = z.infer<typeof WORKER_MESSAGE_SCHEMA>;
