declare module 'html2canvas' {
  export default function html2canvas(
    element: HTMLElement,
    options?: {
      useCORS?: boolean;
      scale?: number;
      width?: number;
      height?: number;
      backgroundColor?: string | null;
    }
  ): Promise<HTMLCanvasElement>;
}