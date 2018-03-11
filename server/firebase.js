// @flow

import admin from 'firebase-admin';

export async function getCounts() {
  const db = getDb();
  if (!db) {
    return {};
  } else {
    const ref = db.ref('counts');
    const res = await ref.once('value');
    return res.val();
  }
}

export function incrementUserCount() {
  incrementCount('users');
}

export function incrementGameCount() {
  incrementCount('games');
}

export function incrementTurnCount() {
  incrementCount('turns');
}

export function incrementLineCount(lines: number) {
  incrementCount('lines', lines);
}

const { FIREBASE_SERVICE_ACCOUNT } = process.env;
const cert = FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(FIREBASE_SERVICE_ACCOUNT)
  : null;

if (!cert) {
  console.warn('Firebase not configured');
}

let db;

// This function receives a callback to gracefully ignore these calls in
// development, where credentials are missing
function getDb() {
  if (!cert) {
    return null;
  }

  if (!db) {
    admin.initializeApp({
      credential: admin.credential.cert(cert),
      databaseURL: 'https://flatris-forever.firebaseio.com'
    });

    db = admin.database();
  }

  return db;
}

function incrementCount(collection: string, by = 1) {
  const db = getDb();
  if (db) {
    const ref = db.ref('counts').child(collection);
    // If it has never been set it returns null
    ref.transaction(curCount => (curCount === null ? by : curCount + by));
  }
}
