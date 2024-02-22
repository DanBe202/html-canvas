export interface Preload {
  preload?(): Promise<void> | void;
}
