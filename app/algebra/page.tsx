import Image from "next/image";
import AlphabetSoup from "./alphabet-soup.webp";

export const metadata = {
  title: "What is Algebra? | Algebra | Clown School",
};

export default function WhatIsAlgebra() {
  return (
    <>
      <h1>What is Algebra?</h1>
      <p className="lead">We put letters in your math.</p>
      <p>
        Algebra is what happens when you put variables in your math and start to
        manipulate equations.
      </p>
      <p>
        This page isn't done yet, so in the meantime, here is a picture of some
        alphabet soup:
      </p>
      <Image
        src={AlphabetSoup}
        alt="Photo of some alphabet soup, with a spoon holding the letters A, B, C."
      />
    </>
  );
}
