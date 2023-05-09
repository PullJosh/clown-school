import Image from "next/image";
import CarImage from "./Car.png";
import WheelImage from "./wheel.svg";
import { useCallback, useEffect, useRef } from "react";

export function Car({ speed = 0 }) {
  const carRef = useRef<HTMLImageElement>(null);
  const leftWheelRef = useRef<HTMLImageElement>(null);
  const rightWheelRef = useRef<HTMLImageElement>(null);

  const angle = useRef(0);

  const animate = useCallback(() => {
    if (!carRef.current || !leftWheelRef.current || !rightWheelRef.current) {
      return;
    }

    leftWheelRef.current.style.transform = `rotate(${angle.current}deg)`;
    rightWheelRef.current.style.transform = `rotate(${angle.current}deg)`;
    // carRef.current.style.transform = `translateY(${Math.cos(
    //   angle.current / 5
    // )}px)`;

    angle.current += speed / 20;
  }, [speed]);

  useAnimationFrame(animate);

  return (
    <div className="relative">
      <Image ref={carRef} src={CarImage} alt={`Car driving at ${speed} mph`} />
      <Image
        ref={leftWheelRef}
        className="absolute bottom-0 left-[10%] w-[23%]"
        src={WheelImage}
        alt=""
      />
      <Image
        ref={rightWheelRef}
        className="absolute bottom-0 right-[9.5%] w-[23%]"
        src={WheelImage}
        alt=""
      />
    </div>
  );
}

function useAnimationFrame(fn: () => void) {
  useEffect(() => {
    let done = false;
    const loop = () => {
      fn();
      if (!done) {
        requestAnimationFrame(loop);
      }
    };

    loop();

    return () => {
      done = true;
    };
  }, [fn]);
}
