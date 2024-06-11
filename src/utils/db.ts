import * as SQLite from 'expo-sqlite'

import { FilterEnum } from '../shared/enums'
import type { FileMetadata, FileData } from '../shared/types'

const openDatabase = async () =>
  await SQLite.openDatabaseAsync('melody_vault', { useNewConnection: true })

export const initDatabase = async () => {
  const db = await openDatabase()

  db.runAsync(
    'CREATE TABLE IF NOT EXISTS filedata (id INTEGER PRIMARY KEY AUTOINCREMENT, filename TEXT, composer TEXT, filepath TEXT);'
  )

  db.runAsync(
    'CREATE TABLE IF NOT EXISTS preferences (id INTEGER PRIMARY KEY AUTOINCREMENT, darkmode INTEGER, filter INTEGER, firstlaunch INTEGER, language TEXT);'
  )
}

export const saveFile = async (metadata: FileMetadata) => {
  const db = await openDatabase()

  db.runAsync(
    'INSERT INTO filedata (filename, composer, filepath) VALUES (?, ?, ?)',
    metadata.filename,
    metadata.composer,
    metadata.filepath
  )
}

export const updateFile = async (
  id: number,
  filename: string,
  composer: string
) => {
  const db = await openDatabase()

  db.runAsync(
    'UPDATE filedata SET filename = ?, composer = ? WHERE id = ?',
    filename,
    composer,
    id
  )
}

export const deleteFile = async (id: number) => {
  const db = await openDatabase()

  db.runAsync('DELETE FROM filedata WHERE id = ?', id)
}

export const getFiles = async (): Promise<FileData[]> => {
  const db = await openDatabase()

  return (await db.getAllAsync('SELECT * FROM filedata')) as FileData[]
}

export const getFilepath = async (id: number): Promise<string> => {
  const db = await openDatabase()

  const row = (await db.getFirstAsync(
    'SELECT filepath FROM filedata WHERE id = ?',
    id
  )) as { filepath: string }
  return row.filepath
}

export const getDarkmode = async (): Promise<boolean | null> => {
  const db = await openDatabase()

  const row = (await db.getFirstAsync('SELECT darkmode FROM preferences')) as {
    darkmode: number | null
  }

  if (!row || row.darkmode === null) {
    return null
  }

  return row.darkmode === 1
}

export const setDarkmode = async (darkmode: boolean) => {
  const db = await openDatabase()

  const isDarkmode = darkmode ? 1 : 0
  await db.runAsync(
    'INSERT INTO preferences (id, darkmode) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET darkmode = excluded.darkmode',
    1,
    isDarkmode
  )
}

export const getFilter = async (): Promise<number> => {
  const db = await openDatabase()

  const row = (await db.getFirstAsync('SELECT filter FROM preferences')) as {
    filter: number | null
  }

  if (!row || !row.filter) {
    return 0
  }

  return row.filter
}

export const setFilter = async (filter: FilterEnum) => {
  const db = await openDatabase()

  await db.runAsync(
    'INSERT INTO preferences (id, filter) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET filter = excluded.filter',
    1,
    filter
  )
}

export const getFirstlaunch = async (): Promise<boolean> => {
  const db = await openDatabase()

  const row = (await db.getFirstAsync(
    'SELECT firstlaunch FROM preferences'
  )) as {
    firstlaunch: number | null
  }

  if (!row || row.firstlaunch === null) {
    return true
  }

  return row.firstlaunch === 1
}

export const setFirstlaunch = async (firstlaunch: boolean) => {
  const db = await openDatabase()

  const isFirstlaunch = firstlaunch ? 1 : 0
  await db.runAsync(
    'INSERT INTO preferences (id, firstlaunch) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET firstlaunch = excluded.firstlaunch',
    1,
    isFirstlaunch
  )
}

export const getLanguage = async (): Promise<string> => {
  const db = await openDatabase()

  const row = (await db.getFirstAsync('SELECT language FROM preferences')) as {
    language: string | null
  }

  return row.language ?? ''
}

export const setLanguage = async (language: string) => {
  const db = await openDatabase()

  await db.runAsync(
    'INSERT INTO preferences (id, language) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET language = excluded.language',
    1,
    language
  )
}
