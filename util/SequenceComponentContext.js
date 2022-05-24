import { createContext } from "react";

// These two context objects could be created inside components/Sequence.js
// EXCEPT that doing so causes errors when hot reloading. (Upon reload,
// all related useContext hooks return undefined.)

// Moving these to a separate file fixes the issue.

export const SequenceContext = createContext();
export const SequenceChildrenDoubleRenderContext = createContext();
