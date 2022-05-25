import { createContext } from "react";

// This context object could be created inside components/Sequence.js
// EXCEPT that doing so causes errors when hot reloading. (Upon reload,
// all related useContext hooks return undefined.)

// Moving this to a separate file fixes the issue.

export const SequenceContext = createContext();
