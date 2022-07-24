type BoundingClientRect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

declare module 'global' {
  export declare global {
    interface ChildNode {
      getBoundingClientRect: () => BoundingClientRect;
      focus: () => void;
    }
  }
}
