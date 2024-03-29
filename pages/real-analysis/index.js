import Image from "next/image";
import { Layout } from "../../components/Layout";
import { Latex } from "../../components/Latex";
import {
  TextConversation,
  TextMessageGroup,
  TextMessage,
} from "../../components/TextConversation";

import newtonImg from "../../public/newton.png";

export default function WhatIsRealAnalysis() {
  return (
    <Layout title="What is real analysis?">
      <div className="not-prose">
        <div className="float-right w-48 hover:animate-spin">
          <Image src={newtonImg} alt="Isaac Newton" />
        </div>
      </div>
      <p className="lead">
        In 1665, Isaac Newton invented calculus. In 1727, he died a virgin.{" "}
        <strong>Now it's your turn.</strong>
      </p>
      <p>
        Don't worry; the path is well-paved. Since Newton, other mathematicians
        have distilled the invention calculus into an area of study called{" "}
        <em>real analysis</em>.
      </p>
      <p>This may sound like serious business. It's not.</p>
      <h2>What are the main ideas of real analysis?</h2>
      <p>
        Analysis deals a lot with infinity and its associated funny business.
      </p>
      <aside className="no-prose max-w-xs float-right -mr-12 ml-8">
        <TextConversation>
          <TextMessageGroup person="other">
            <TextMessage>
              what is the smallest number bigger than 0?
            </TextMessage>
          </TextMessageGroup>
          <TextMessageGroup person="self">
            <TextMessage>uh... 0.00001?</TextMessage>
          </TextMessageGroup>
          <TextMessageGroup person="other">
            <TextMessage>what about 0.00000001?</TextMessage>
          </TextMessageGroup>
          <TextMessageGroup person="self">
            <TextMessage>
              what about <Latex value={String.raw`10^{-100}`} />?
            </TextMessage>
          </TextMessageGroup>
          <TextMessageGroup person="other">
            <TextMessage>
              what about <Latex value={String.raw`10^{-10000}`} />
            </TextMessage>
          </TextMessageGroup>
          <TextMessageGroup person="self">
            <TextMessage>i hate this</TextMessage>
          </TextMessageGroup>
        </TextConversation>
      </aside>
      <p>
        Fortunately, you don't have to be a genius who can see into the fourth
        dimension to understand infinity. Instead, we explore infinity the same
        way a 4 year old does: by asking annoying questions.
      </p>
      <p>
        For example, if your little brother asks whether{" "}
        <Latex value={String.raw`\frac{1}{n}`} /> gets smaller than{" "}
        <em>this 🤏</em> you can always throw a big{" "}
        <Latex value={String.raw`n`} /> at him and win. That's how we know it
        gets infinitely small.
      </p>
    </Layout>
  );
}
