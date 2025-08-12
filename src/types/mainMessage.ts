import { z } from "zod/v4-mini";
import { MAIN_MESSAGE_SCHEMA } from "../schema/mainMessage";

export type MainMessage = z.infer<typeof MAIN_MESSAGE_SCHEMA>;
