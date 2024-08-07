import * as SQLite from 'expo-sqlite'

import { FilterEnum } from '../shared/enums'
import type { FileMetadata, FileData } from '../shared/types'

const openDatabase = async () =>
  await SQLite.openDatabaseAsync('melody_vault', { useNewConnection: true })

const getDatabaseVersion = async () => {
  const db = await openDatabase()

  const row = db.getFirstSync('PRAGMA user_version') as {
    user_version: number
  }

  return row.user_version
}

const applyMigrations = async () => {
  const db = await openDatabase()
  let currentVersion = await getDatabaseVersion()

  const migrations = [
    'ALTER TABLE filedata ADD COLUMN favorite INTEGER',
    'ALTER TABLE preferences ADD COLUMN last_opened INTEGER',
    'ALTER TABLE preferences ADD COLUMN streak INTEGER',
    'ALTER TABLE preferences ADD COLUMN streak_allowed INTEGER'
  ]

  migrations.forEach((migration, i) => {
    if (currentVersion === i) {
      db.runSync(migration)
      db.runSync(`PRAGMA user_version = ${i + 1}`)
      currentVersion = i + 1
    }
  })
}

export const initDatabase = async () => {
  const db = await openDatabase()

  db.runSync(
    'CREATE TABLE IF NOT EXISTS filedata (id INTEGER PRIMARY KEY AUTOINCREMENT, filename TEXT, composer TEXT, filepath TEXT);'
  )

  db.runSync(
    'CREATE TABLE IF NOT EXISTS preferences (id INTEGER PRIMARY KEY AUTOINCREMENT, darkmode INTEGER, filter INTEGER, firstlaunch INTEGER, language TEXT);'
  )

  applyMigrations()
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

  await db.runAsync(
    'INSERT INTO preferences (id, darkmode) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET darkmode = excluded.darkmode',
    1,
    Number(darkmode)
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

export const getLastOpened = async (): Promise<number> => {
  const db = await openDatabase()

  const row = (await db.getFirstAsync(
    'SELECT last_opened FROM preferences'
  )) as {
    last_opened: number | null
  }

  return row?.last_opened ?? 0
}

export const setLastOpened = async (last_opened: number) => {
  const db = await openDatabase()

  await db.runAsync(
    'INSERT INTO preferences (id, last_opened) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET last_opened = excluded.last_opened',
    1,
    last_opened
  )
}

export const getStreak = async (): Promise<number> => {
  const db = await openDatabase()

  const row = (await db.getFirstAsync('SELECT streak FROM preferences')) as {
    streak: number | null
  }

  return row?.streak ?? 1
}

export const setStreak = async (streak: number) => {
  const db = await openDatabase()

  await db.runAsync(
    'INSERT INTO preferences (id, streak) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET streak = excluded.streak',
    1,
    streak
  )
}

export const getStreakAllowed = async (): Promise<boolean> => {
  const db = await openDatabase()

  const row = (await db.getFirstAsync(
    'SELECT streak_allowed FROM preferences'
  )) as {
    streak_allowed: number | null
  }

  if (!row || !row.streak_allowed) {
    return false
  }

  return row.streak_allowed === 1
}

export const setStreakAllowed = async (streakAllowed: boolean) => {
  const db = await openDatabase()
  await db.runAsync(
    'INSERT INTO preferences (id, streak_allowed) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET streak_allowed = excluded.streak_allowed',
    1,
    Number(streakAllowed)
  )
}

export const getLanguage = async (): Promise<string> => {
  const db = await openDatabase()

  const row = (await db.getFirstAsync('SELECT language FROM preferences')) as {
    language: string | null
  }

  return row?.language ?? ''
}

export const setLanguage = async (language: string) => {
  const db = await openDatabase()

  await db.runAsync(
    'INSERT INTO preferences (id, language) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET language = excluded.language',
    1,
    language
  )
}

export const getFavorite = async (id: number): Promise<boolean> => {
  const db = await openDatabase()

  const row = (await db.getFirstAsync(
    'SELECT favorite FROM filedata WHERE id = ?',
    id
  )) as {
    favorite: number | null
  }

  if (!row || !row.favorite) {
    return false
  }

  return row.favorite === 1
}

export const setFavorite = async (id: number, favorite: boolean) => {
  const db = await openDatabase()

  await db.runAsync(
    'UPDATE filedata SET favorite = ? WHERE id = ?',
    Number(favorite),
    id
  )
}
