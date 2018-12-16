// @flow

import admin from 'firebase-admin';

import type { Stats } from 'shared/types/state';

export async function getStats(): Promise<Stats> {
  const db = getDb();
  if (!db) {
    return {
      actionAcc: 0,
      actionLeft: 0,
      actionRight: 0,
      actionRotate: 0,
      games: 0,
      lines: 0,
      seconds: 0
    };
  } else {
    const ref = db.ref('counts');
    const res = await ref.once('value');

    return prepareStats(res.val());
  }
}

export function onStatsChange(changeHandler: (stats: Stats) => void) {
  const db = getDb();
  if (db) {
    const ref = db.ref('counts');
    ref.on('value', snapshot => {
      changeHandler(prepareStats(snapshot.val()));
    });
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

export function incrementActionLeft(times: number) {
  incrementCount('actionLeft', times);
}

export function incrementActionRight(times: number) {
  incrementCount('actionRight', times);
}

export function incrementActionAcc(times: number) {
  incrementCount('actionAcc', times);
}

export function incrementActionRotate(times: number) {
  incrementCount('actionRotate', times);
}

export function incrementGameTime(seconds: number) {
  incrementCount('seconds', seconds);
}

const { FIREBASE_SERVICE_ACCOUNT } = process.env;
const cert = FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(FIREBASE_SERVICE_ACCOUNT)
  : null;

if (!cert) {
  console.warn('Firebase not configured');
} else {
  // https://stackoverflow.com/a/50376092
  cert.private_key = cert.private_key.replace(/\\n/g, '\n');
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

function prepareStats(rawStats) {
  const {
    actionAcc,
    actionLeft,
    actionRight,
    actionRotate,
    games,
    lines,
    seconds,
    turns
  } = rawStats;

  return {
    actionAcc,
    actionLeft,
    actionRight,
    actionRotate,
    games: games + turns,
    lines,
    seconds
  };
}
