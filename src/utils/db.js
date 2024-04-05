import * as SQLite from 'expo-sqlite';

const initDatabase = async () => {
  const db = SQLite.openDatabase('melody_vault');
  await db.transaction(
    (tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS filedata (id INTEGER PRIMARY KEY AUTOINCREMENT, filename TEXT, filepath TEXT);'
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
    await tx.executeSqlAsync('INSERT INTO filedata (filename, filepath) VALUES (?, ?)',
      [metadata.filename, metadata.filepath]
    );
  }, false);
};

const deleteFile = async (id) => {
  const db = SQLite.openDatabase('melody_vault');
  await db.transactionAsync(async tx => {
    await tx.executeSqlAsync('DELETE FROM filedata WHERE id = (?)', [id]
    );
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

const getFilepath = async (id) => {
  const db = SQLite.openDatabase('melody_vault');
  let result;
  await db.transactionAsync(async tx => {
    result = await tx.executeSqlAsync('SELECT filepath FROM filedata WHERE id = (?)', [id]);
  }, true);
  return result.rows[0].filepath
}

export {
  initDatabase,
  saveFile,
  deleteFile,
  getFiles,
  getFilepath
}
