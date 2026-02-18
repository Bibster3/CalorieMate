import { IDBPDatabase, openDB } from "idb";

let db: IDBPDatabase<unknown>;

const openDatabase = async () => {
  db = await openDB("ps-fitness-tracker", 1, {
    upgrade(db, /* oldVersion, newVersion, transaction, event */) {
      db.createObjectStore("settings");
      db.createObjectStore("meals", { autoIncrement: true });
      db.createObjectStore("activities", { autoIncrement: true });
    },
    /* blocked(currentVersion, blockedVersion, event) {
      // …
    },
    blocking(currentVersion, blockedVersion, event) {
      // …
    },
    terminated() {
      // …
    }, */
  });
};

export const getDatabase = async () => {
  if (!db) {
    await openDatabase();
  }
  return db;
};

export const clearDatabase = async () => {
  const database = await getDatabase();
  await database.clear("settings");
  await database.clear("meals");
  await database.clear("activities");
};
