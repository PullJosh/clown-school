import Image from "next/image";
import { Latex } from "../../components/Latex";

import CalcSumImage from "./calc-sum-image.svg";

export const metadata = {
  title: "What is Calculus? | Calculus | Clown School",
};

export default function WhatIsCalculus() {
  return (
    <>
      <h1>What is Calculus?</h1>
      <p className="lead">
        Calculus is the study of what happens if you let{" "}
        <Latex value={String.raw`\infty`} /> into the picture.
      </p>
      <p>What do you get if you add up an infinite number of fractions?</p>
      <Latex
        value={String.raw`\frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \frac{1}{16} + \frac{1}{32} + \frac{1}{64} + \frac{1}{128} + \frac{1}{256} + \frac{1}{512} + \frac{1}{1024} + \frac{1}{2048} + ...`}
        displayMode={true}
      />
      <p>
        Not just a <em>lot</em> of terms, but infinite terms? You might think
        that if you add up infinitely many positive terms you get infinity, but
        that's not true! The sum above is actually equal to exactly 1.
      </p>
      <p>That might be surprising, but maybe this picture will convince you:</p>
      <div className="not-prose flex justify-center">
        <Image
          src={CalcSumImage}
          alt="Geometric proof that the infinite sum is equal to 1"
        />
      </div>
      <p>
        Calculus is the study of situations like this, where we allow for the
        concept of infinity and get exact answers as a result.
      </p>
    </>
  );
}
