import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from "react";
import type { ReactNode } from "react";
import classNames from "classnames";

type SlotId = string | number;
type MagnetType = "box" | "round" | null;

interface FridgeMagnetsProps {
  options: {
    content: ReactNode;
    correctSlot: SlotId;
    type?: MagnetType;
  }[];
  children: ReactNode;
}

interface Magnet {
  key: number;
  content: ReactNode;
  type: MagnetType;
  slot: SlotId;
  correctSlot: SlotId;
}

interface FridgeMagnetsContextType {
  magnets: Magnet[];
  moveMagnet: (key: Magnet["key"], newSlot: SlotId) => void;
  highlightedSlot: SlotId | null;
  setHighlightedSlot: React.Dispatch<React.SetStateAction<SlotId | null>>;
}

const FridgeMagnetsContext = createContext<FridgeMagnetsContextType | null>(
  null
);

export function FridgeMagnets({ options, children }: FridgeMagnetsProps) {
  const [magnets, setMagnets] = useState<Magnet[]>(
    options.map(({ content, correctSlot, type = "box" }, index) => ({
      key: index,
      content,
      type,
      slot: "pool",
      correctSlot,
    }))
  );

  const [highlightedSlot, setHighlightedSlot] = useState<SlotId | null>(null);

  const moveMagnet = useCallback((key: Magnet["key"], newSlot: SlotId) => {
    setMagnets((magnets) =>
      magnets.map((magnet) => {
        if (magnet.key === key) {
          return { ...magnet, slot: newSlot };
        }
        return magnet;
      })
    );
  }, []);

  return (
    <FridgeMagnetsContext.Provider
      value={{ magnets, moveMagnet, highlightedSlot, setHighlightedSlot }}
    >
      <div className="space-y-8">
        <div>{children}</div>
        <div
          data-slotid="pool"
          data-filled={false}
          data-type={null}
          className={classNames(
            "FridgeMagnetSlot py-12 px-6 rounded-xl border-2 flex items-center",
            {
              "bg-gray-100": highlightedSlot !== "pool",
              "bg-yellow-100 border-yellow-200": highlightedSlot === "pool",
            }
          )}
        >
          <div className="text-center mx-auto">
            {magnets
              .filter((magnet) => magnet.slot === "pool")
              .map((magnet) => (
                <span className="inline-block m-2" key={magnet.key}>
                  <FridgeMagnet
                    type={magnet.type}
                    currentLocation="pool"
                    rotate="random"
                    moveMagnet={(newSlot) => moveMagnet(magnet.key, newSlot)}
                    setHighlightedSlot={setHighlightedSlot}
                  >
                    {magnet.content}
                  </FridgeMagnet>
                </span>
              ))}
          </div>
        </div>
      </div>
    </FridgeMagnetsContext.Provider>
  );
}

interface FridgeMagnetProps {
  children: ReactNode;
  type: MagnetType;
  rotate?: "random" | -2 | -1 | 0 | 1 | 2;
  currentLocation: SlotId;
  moveMagnet: (newSlot: SlotId) => void;
  setHighlightedSlot: (slotId: SlotId | null) => void;
}

function FridgeMagnet({
  children,
  type,
  rotate = 0,
  currentLocation,
  moveMagnet,
  setHighlightedSlot,
}: FridgeMagnetProps) {
  const [randomRotationSelection] = useState<-2 | -1 | 0 | 1 | 2>(
    Math.floor(Math.random() * 5 - 2) as any
  );

  if (rotate === "random") {
    rotate = randomRotationSelection;
  }

  // https://stackoverflow.com/a/18157551/2205195
  function distanceToRect(rect: DOMRect, x: number, y: number): number {
    const dx = Math.max(rect.left - x, 0, x - rect.right);
    const dy = Math.max(rect.top - y, 0, y - rect.bottom);
    return Math.hypot(dx, dy);
  }

  interface NearestSlot {
    dist: number;
    id: SlotId;
  }

  function getMouseCoords(
    event: MouseEvent | React.MouseEvent | TouchEvent | React.TouchEvent
  ) {
    if ("clientX" in event) {
      return [event.clientX, event.clientY];
    }

    const touch = event.changedTouches[0];
    return [touch.clientX, touch.clientY];
  }

  function getNearestSlot(
    event: MouseEvent | React.MouseEvent | TouchEvent | React.TouchEvent
  ) {
    return (
      [...document.querySelectorAll(".FridgeMagnetSlot")]
        .map((slot) => {
          let id: string | null = slot.getAttribute("data-slotid");
          if (!id) {
            throw new Error("data-slotid attribute missing");
          }
          let parsedId: string | number = id;
          if (!isNaN(+id) && !isNaN(parseFloat(id))) {
            parsedId = Number(id);
          }
          return { slot, id: parsedId };
        })
        .filter(({ slot }) => slot.getAttribute("data-filled") === "false")
        .filter(
          ({ slot }) =>
            slot.getAttribute("data-type") === type ||
            slot.getAttribute("data-type") === null
        )
        .filter(
          ({ slot }) => slot.getAttribute("data-slotid") !== currentLocation
        )
        .map(({ slot, id }) => {
          const rect = slot.getBoundingClientRect();
          const [mouseX, mouseY] = getMouseCoords(event);
          return {
            dist: distanceToRect(rect, mouseX, mouseY),
            id,
          };
        })
        .sort((a, b) => a.dist - b.dist)[0] ?? null
    );
  }

  interface DragStart {
    mouseX: number;
    mouseY: number;
  }

  interface DragValue {
    offsetX: number;
    offsetY: number;
    nearestSlot: NearestSlot;
  }

  const [dragStart, setDragStart] = useState<DragStart | null>(null);
  const [dragValue, setDragValue] = useState<DragValue | null>(null);
  const onMouseDown = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      const [mouseX, mouseY] = getMouseCoords(event);
      setDragStart({ mouseX, mouseY });

      const nearestSlot = getNearestSlot(event);
      if (nearestSlot && nearestSlot.dist < 50) {
        setHighlightedSlot(nearestSlot.id);
      } else {
        setHighlightedSlot(null);
      }

      setDragValue({ offsetX: 0, offsetY: 0, nearestSlot });
    },
    []
  );

  const onMouseMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (dragStart) {
        event.preventDefault();

        const nearestSlot = getNearestSlot(event);
        if (nearestSlot && nearestSlot.dist < 50) {
          setHighlightedSlot(nearestSlot.id);
        } else {
          setHighlightedSlot(null);
        }

        const [mouseX, mouseY] = getMouseCoords(event);
        setDragValue({
          offsetX: mouseX - dragStart.mouseX,
          offsetY: mouseY - dragStart.mouseY,
          nearestSlot,
        });
      }
    },
    [dragStart]
  );

  const onMouseUp = useCallback(() => {
    if (dragStart && dragValue) {
      if (dragValue.nearestSlot && dragValue.nearestSlot.dist < 50) {
        moveMagnet(dragValue.nearestSlot.id);
      }
      setHighlightedSlot(null);
      setDragStart(null);
      setDragValue(null);
    }
  }, [dragStart, dragValue]);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", onMouseMove, { passive: false });
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchend", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchmove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchend", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <div
      style={{
        transform: dragValue
          ? `translate(${dragValue.offsetX}px, ${dragValue.offsetY}px)`
          : undefined,
      }}
    >
      <div
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
        className={classNames(
          "inline-block bg-white shadow py-1 whitespace-nowrap cursor-move select-none",
          {
            "px-2": type === "box",
            "rounded-full px-3": type === "round",
            "-rotate-2": rotate === -2,
            "-rotate-1": rotate === -1,
            "rotate-0": rotate === 0,
            "rotate-1": rotate === 1,
            "rotate-2": rotate === 2,
            "z-30": dragStart,
          }
        )}
      >
        {children}
      </div>
    </div>
  );
}

interface FridgeMagnetSlotProps {
  id: SlotId;
  type?: MagnetType;
}

export function FridgeMagnetSlot({ id, type = "box" }: FridgeMagnetSlotProps) {
  const ctx = useContext(FridgeMagnetsContext);
  if (ctx === null) {
    throw new Error("Missing FridgeMagnetsContext");
  }

  const { magnets, moveMagnet, highlightedSlot, setHighlightedSlot } = ctx;

  const magnet = magnets.find((m) => m.slot === id);
  const highlighted = highlightedSlot === id;

  return (
    <div
      className={classNames(
        "FridgeMagnetSlot inline-block border-2 border-dashed",
        {
          "rounded-full": type === "round",
          "bg-gray-100": !highlighted,
          "bg-yellow-100 border-yellow-300": highlighted,
        }
      )}
      data-slotid={id}
      data-filled={!!magnet}
      data-type={type}
    >
      {magnet ? (
        <FridgeMagnet
          type={magnet.type}
          currentLocation={id}
          moveMagnet={(newSlot: SlotId) => moveMagnet(magnet.key, newSlot)}
          setHighlightedSlot={setHighlightedSlot}
        >
          {magnet.content}
        </FridgeMagnet>
      ) : (
        <span className="invisible">
          <FridgeMagnet>Empty space</FridgeMagnet>
        </span>
      )}
    </div>
  );
}
