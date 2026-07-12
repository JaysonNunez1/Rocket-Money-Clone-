// Simple JSON-file data store. Swap for Postgres/SQLite when you go to production.
import fs from "fs";
import path from "path";
import crypto from "node:crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "data.json");

function load() {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
  } catch {
    return { users: [], plaidItems: [] };
  }
}

function save(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

export const store = {
  findUserByEmail(email) {
    return load().users.find((u) => u.email === email.toLowerCase());
  },
  findUserById(id) {
    return load().users.find((u) => u.id === id);
  },
  createUser({ name, email, passwordHash }) {
    const db = load();
    const user = {
      id: crypto.randomUUID(),
      name,
      email: email.toLowerCase(),
      passwordHash,
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
    save(db);
    return user;
  },
  addPlaidItem({ userId, accessToken, itemId, institution }) {
    const db = load();
    db.plaidItems = db.plaidItems.filter((i) => i.itemId !== itemId);
    db.plaidItems.push({ userId, accessToken, itemId, institution, linkedAt: new Date().toISOString() });
    save(db);
  },
  getPlaidItems(userId) {
    return load().plaidItems.filter((i) => i.userId === userId);
  },
};
