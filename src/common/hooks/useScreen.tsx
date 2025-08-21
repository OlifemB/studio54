'use client'

import {useEffect, useState} from "react";

type DeviceType = "mobile" | "tablet" | "laptop" | "desktop";
type Orientation = "horizontal" | "vertical";

interface ScreenInfo {
  x: number;
  y: number;
  type: DeviceType;
  orientation: Orientation;
}

function getDeviceType(width: number): DeviceType {
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  if (width < 1440) return "laptop";
  return "desktop";
}

function getOrientation(width: number, height: number): Orientation {
  return width >= height ? "horizontal" : "vertical";
}

export function useScreen(): ScreenInfo {
  const [screen, setScreen] = useState<ScreenInfo>({
    x: 0,
    y: 0,
    type: "desktop",
    orientation: "horizontal",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    function updateSize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreen({
        x: width,
        y: height,
        type: getDeviceType(width),
        orientation: getOrientation(width, height),
      });
    }

    updateSize();
    window.addEventListener("resize", updateSize);
    window.addEventListener("orientationchange", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("orientationchange", updateSize);
    };
  }, []);

  return screen;
}