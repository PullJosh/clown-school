import { useContext, createContext } from "react";
import classNames from "classnames";

const TextConversationContext = createContext();
const TextMessageGroupContext = createContext();

export function TextConversation({ children, size = "normal" }) {
  return (
    <TextConversationContext.Provider value={{ size }}>
      <div className="flex flex-col space-y-2">{children}</div>
    </TextConversationContext.Provider>
  );
}

export function TextMessageGroup({ children, person }) {
  return (
    <TextMessageGroupContext.Provider value={{ person }}>
      <div className="flex flex-col space-y-px">{children}</div>
    </TextMessageGroupContext.Provider>
  );
}

export function TextMessage({ children, emoji = false }) {
  const { size } = useContext(TextConversationContext);
  const { person } = useContext(TextMessageGroupContext);

  if (emoji) {
    return (
      <div className={classNames({ "text-4xl": size === "normal" })}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={classNames("group relative max-w-[70%]", {
        "text-sm px-3 py-1 rounded-2xl": size === "normal",
        "text-lg px-4 py-2 rounded-3xl": size === "large",
        "self-start bg-[#E9E9EB] text-slate-900": person === "other",
        "self-end bg-[#559FF4] text-white": person === "self",
      })}
    >
      {children}
      <svg
        viewBox="0 0 33 34"
        className={classNames("hidden group-last:block absolute bottom-0", {
          "h-4": size === "normal",
          "h-6": size === "large",
          "left-0 -scale-x-100 -translate-x-[34%]": person === "other",
          "right-0 translate-x-[34%]": person === "self",
        })}
      >
        <g transform="matrix(1,0,0,1,-766.004,-948)">
          <g transform="matrix(1,0,0,1,0,176)">
            <path
              d="M788,790C788,797.031 792.278,803.071 798.37,805.657C796.945,805.88 795.487,805.996 794.002,805.996C778.549,805.996 766.004,793.451 766.004,777.998C766.004,775.94 766.227,773.933 766.649,772L788,772L788,790Z"
              className={classNames({
                "fill-[#E9E9EB]": person === "other",
                "fill-[#559FF4]": person === "self",
              })}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
