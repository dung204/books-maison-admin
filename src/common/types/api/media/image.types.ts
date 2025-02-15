export interface ImagePayload {
  file: File;
  previewUrl: string;
}

export interface ImageScale {
  min: number;
  max: number;
  current: number;
}

export interface ImagePosition {
  offsetX: number;
  offsetY: number;
}
