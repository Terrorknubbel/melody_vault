import * as SQLite from 'expo-sqlite';

const initDatabase = async () => {
  const db = SQLite.openDatabase('melody_vault');
  await db.transaction(
    (tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS filedata (id INTEGER PRIMARY KEY AUTOINCREMENT, filename TEXT);'
      );
    },
    (error) => console.log('Table creation error:', error),
    () => console.log('Table created successfully')
  );
  console.log("Database initialization complete");
};

const saveFile = async (metadata) => {
  const db = SQLite.openDatabase('melody_vault');
  await db.transactionAsync(async tx => {
    await tx.executeSqlAsync('INSERT INTO filedata (filename) VALUES (?)', [metadata.filename]);
  }, false);
};

const getFiles = async () => {
  const db = SQLite.openDatabase('melody_vault');
  let result;
  await db.transactionAsync(async tx => {
    result = await tx.executeSqlAsync('SELECT * FROM filedata', []);
  }, true);
  return result.rows
}

export {
  initDatabase,
  saveFile,
  getFiles
}
