export {};

declare global {
  interface Window {
    enableColumnResize?: () => void;
  }
}
