import * as SQLite from 'expo-sqlite'

import type { FileMetadata, FileData } from '../shared/types'

const initDatabase = async (): Promise<void> => {
  const db = SQLite.openDatabase('melody_vault')
  db.transaction(
    (tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS filedata (id INTEGER PRIMARY KEY AUTOINCREMENT, filename TEXT, filepath TEXT);'
      )
    },
    (error) => console.log('Table creation error:', error),
    () => console.log('Table created successfully')
  )
  console.log('Database initialization complete')
}

const saveFile = async (metadata: FileMetadata): Promise<void> => {
  const db = SQLite.openDatabase('melody_vault')
  await db.transactionAsync(async (tx) => {
    await tx.executeSqlAsync(
      'INSERT INTO filedata (filename, filepath) VALUES (?, ?)',
      [metadata.filename, metadata.filepath]
    )
  }, false)
}

const deleteFile = async (id: number): Promise<void> => {
  const db = SQLite.openDatabase('melody_vault')
  await db.transactionAsync(async (tx) => {
    await tx.executeSqlAsync('DELETE FROM filedata WHERE id = (?)', [id])
  }, false)
}

const getFiles = async (): Promise<FileData[]> => {
  const db = SQLite.openDatabase('melody_vault')
  let files: FileData[] = []

  await db.transactionAsync(async (tx) => {
    const result: SQLite.ResultSet = await tx.executeSqlAsync(
      'SELECT * FROM filedata',
      []
    )

    files = Array.from(result.rows) as FileData[]
  }, true)

  return files
}

const getFilepath = async (id: number): Promise<string> => {
  const db = SQLite.openDatabase('melody_vault')
  let result: SQLite.ResultSet | undefined
  await db.transactionAsync(async (tx) => {
    result = await tx.executeSqlAsync(
      'SELECT filepath FROM filedata WHERE id = (?)',
      [id]
    )
  }, true)

  return result?.rows[0].filepath
}

export { initDatabase, saveFile, deleteFile, getFiles, getFilepath }
