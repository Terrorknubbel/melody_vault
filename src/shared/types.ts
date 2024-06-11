export interface FileMetadata {
  filename: string
  composer: string
  favorite: boolean
  filepath: string
}

export interface SheetMetadata {
  filename: string
  composer: string
  filepath?: string
}

export interface FileData extends FileMetadata {
  id: number
}
