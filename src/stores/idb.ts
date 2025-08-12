import { openDB } from "idb";
import { POMO_SCHEMA } from "../schema/pomoTimer";
import type { Pomo } from "../types/pomoTimer";
import {
  getDefaultPomo,
  isOverdue,
  refreshResetTime,
  resetData,
} from "../utils/pomoTimer";

const DATABASE_NAME = "pomoTimer";

const STORE_NAME = "pomoTimer";

const KEY = "pomo";

const dbPromise = openDB(DATABASE_NAME, 1, {
  upgrade: (db) => {
    db.createObjectStore(STORE_NAME);
  },
});

export async function init(): Promise<void> {
  const db = await dbPromise;

  const transaction = db.transaction(STORE_NAME, "readwrite");

  const store = transaction.store;

  let pomo: Pomo | null = null;

  try {
    const result: unknown = await store.get(KEY);
    const parsed = POMO_SCHEMA.parse(result);
    pomo = parsed;
  } catch (error) {
    console.error(error);
  }

  if (pomo === null) {
    pomo = getDefaultPomo();
  } else if (isOverdue(pomo)) {
    pomo = refreshResetTime(pomo);
    pomo = resetData(pomo);
  }

  try {
    await store.put(pomo, KEY);
  } catch (error) {
    console.error(error);
  }
}

export async function getIDBPomo(): Promise<Pomo | null> {
  try {
    const db = await dbPromise;
    const result: unknown = await db.get(STORE_NAME, KEY);
    const parsed = POMO_SCHEMA.parse(result);
    return parsed;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function setIDBPomo(data: unknown): Promise<void> {
  try {
    const db = await dbPromise;
    const pomo = POMO_SCHEMA.parse(data);
    await db.put(STORE_NAME, pomo, KEY);
  } catch (error) {
    console.error(error);
  }
}
