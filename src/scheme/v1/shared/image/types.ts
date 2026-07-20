export interface ImageDto {
  preview?: string
  thumbnail?: string
  optimized?: ImageOptimizedDto
}

export interface Image {
  preview: string | null
  thumbnail: string | null
  optimized: ImageOptimized | null
}

export interface ImageOptimizedDto {
  preview?: string
  thumbnail?: string
}

export interface ImageOptimized {
  preview: string | null
  thumbnail: string | null
}
