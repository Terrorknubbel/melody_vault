import * as SQLite from 'expo-sqlite'

import type { FileMetadata, FileData } from '../shared/types'

const openDatabase = () => {
  const db = SQLite.openDatabase('melody_vault')
  return db
}

export const initDatabase = async (): Promise<void> => {
  const db = openDatabase()

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS filedata (id INTEGER PRIMARY KEY AUTOINCREMENT, filename TEXT, composer TEXT, filepath TEXT);'
        )
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS preferences (id INTEGER PRIMARY KEY AUTOINCREMENT, darkmode INTEGER);'
        )
      },
      (error) => {
        console.log('Table creation error:', error)
        reject(error)
      },
      () => {
        console.log('Table created successfully')
        resolve()
      }
    )
  })
}

export const saveFile = async (metadata: FileMetadata): Promise<void> => {
  const db = openDatabase()

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'INSERT INTO filedata (filename, composer, filepath) VALUES (?, ?, ?)',
          [metadata.filename, metadata.composer, metadata.filepath]
        )
      },
      (error) => {
        console.log('Save file error:', error)
        reject(error)
      },
      resolve
    )
  })
}

export const updateFile = async (
  id: number,
  filename: string,
  composer: string
): Promise<void> => {
  const db = openDatabase()

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'UPDATE filedata SET filename = ?, composer = ? WHERE id = ?',
          [filename, composer, id]
        )
      },
      (error) => {
        console.log('Update file error:', error)
        reject(error)
      },
      resolve
    )
  })
}

export const deleteFile = async (id: number): Promise<void> => {
  const db = openDatabase()

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql('DELETE FROM filedata WHERE id = ?', [id])
      },
      (error) => {
        console.log('Delete file error:', error)
        reject(error)
      },
      resolve
    )
  })
}

export const getFiles = async (): Promise<FileData[]> => {
  const db = openDatabase()

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM filedata',
        [],
        (_, result) => resolve(result.rows._array),
        (tx, error) => {
          console.log('Get files error:', error)
          reject(error)
          return true
        }
      )
    })
  })
}

export const getFilepath = async (id: number): Promise<string> => {
  const db = openDatabase()

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT filepath FROM filedata WHERE id = ?',
        [id],
        (_, result) => resolve(result.rows.item(0).filepath),
        (tx, error) => {
          console.log('Get filepath error:', error)
          reject(error)
          return true
        }
      )
    })
  })
}

export const getDarkmode = async (): Promise<boolean> => {
  const db = openDatabase()

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT darkmode FROM preferences',
        [],
        (_, result) => {
          const darkmode =
            result.rows.length > 0 ? result.rows.item(0).darkmode === 1 : false
          resolve(darkmode)
        },
        (tx, error) => {
          console.log('Get darkmode error:', error)
          reject(error)
          return true
        }
      )
    })
  })
}

export const setDarkmode = async (darkmode: boolean): Promise<void> => {
  const db = openDatabase()

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'INSERT OR REPLACE INTO preferences (id, darkmode) VALUES (1, ?)',
          [darkmode ? 1 : 0]
        )
      },
      (error) => {
        console.log('Set darkmode error:', error)
        reject(error)
      },
      resolve
    )
  })
}
