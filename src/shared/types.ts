export interface FileMetadata {
  filename: string
  filepath: string
}

export interface FileData extends FileMetadata {
  id: number
}
