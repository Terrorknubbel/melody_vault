export interface FileMetadata {
  filename: string
  composer: string
  filepath: string
}

export interface FileData extends FileMetadata {
  id: number
}
