"use client";

import * as React from "react";
import { Live } from "@use-gpu/react";
import { use, type LiveElement } from "@use-gpu/live";

/**
 * Creates a React component that renders a canvas and a fallback element, and then renders the result of render() into the canvas.
 * @param renderPromise A dynamic import that resolves to a render() function. This function is *almost* like a Live component, but it can't use hooks.
 * @returns A React component that renders a canvas and a fallback element, and then renders the result of render() into the canvas.
 */
export function makeCanvasApp<Render extends (props: any) => LiveElement>(
  renderPromise: Promise<Render>,
) {
  type AppProps = Parameters<Render>[0];
  type CanvasProps = React.ComponentProps<"canvas"> & {
    width: number;
    height: number;
  };
  type Props = AppProps & CanvasProps;

  return function CanvasApp(props: Omit<Props, "canvas" | "fallback">) {
    const [render, setRender] = React.useState<Render | null>(null);
    const [canvas, setCanvas] = React.useState<HTMLCanvasElement | null>(null);
    const [fallback, setFallback] = React.useState<HTMLElement | null>(null);

    React.useEffect(() => {
      renderPromise.then((m) => setRender(() => m));
    }, []);

    return (
      <div
        style={{
          position: "relative",
          width: props.width,
          height: props.height,
        }}
      >
        <div
          ref={setFallback}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <canvas {...props} style={{ position: "relative" }} ref={setCanvas} />
        {render && canvas && fallback && (
          <Live>{use(render, { canvas, fallback, ...props })}</Live>
        )}
      </div>
    );
  };
}
