import { Latex } from "../../../components/Latex";
import { Graph, GraphFunction } from "../Graph";
import { useStopwatch } from "../useStopwatch";
import { Aside } from "../../../components/Aside";
import { CarGraph } from "../CarGraph";

export const metadata = {
  title: "Who cares about area? | Calculus | Clown School",
};

const fA = (x: number) => {
  return 60;
};

const fB = (x: number) => {
  if (x < 1) return 20;
  if (x < 2) return 40;
  return 60;
};

const fC = (x: number) => {
  return x * (60 / 3);
};

export default function WhoCaresAboutArea() {
  return (
    <>
      <h1>Who cares about area?</h1>
      <p className="lead">
        Finding the shaded area under a function seems like a very specific
        problem, but it turns out to be surprisingly useful. It's a fundamental
        technique in math, physics, and beyond.
      </p>

      <h2>A Slow Start</h2>
      <blockquote>
        Suppose a car is driving at 60mph for 3 hours. How far does it travel in
        that time?
      </blockquote>
      <p>It's an easy question, right? Just multiply:</p>
      <Latex
        displayMode={true}
        value={String.raw`60\ \frac{\text{miles}}{\cancel{\text{hour}}} \times 3\ \cancel{\text{hours}} = 180\ \text{miles}`}
      />
      <p>Multiplying makes the units cancel, and we're left with miles.</p>
      <p>
        This problem can be represented with a rectangle of width 3 (for the 3
        hours of driving) and height 60 (for the speed of the car). The area of
        the rectangle is{" "}
        <Latex value={String.raw`60 \cdot 3 = 180\ \text{miles}`} />.
      </p>
      <div className="not-prose">
        <CarGraph f={fA.toString()} stopwatch={false} />
      </div>
      <p>
        Of course, doing this doesn't seem all that helpful until you consider a
        harder problem...
      </p>
      <h2>Changing Gears</h2>
      <blockquote>
        Suppose a car is driving for 3 hours. During the first hour, it drives
        at 20mph. During the second hour, it drives at 40mph. During the third
        hour, it drives at 60mph. How far does the car travel in total?
      </blockquote>
      <p>
        Now our problem has three separate phases, which can be represented on a
        graph:
      </p>
      <div className="not-prose">
        <CarGraph f={fB.toString()} stopwatch={true} />
      </div>
      <p>
        We can calculate the distance the car travels during each of the three
        phases:
        <Latex
          displayMode={true}
          value={String.raw`\begin{align*}
          20\ \frac{\text{miles}}{\text{hour}} \times 1\ \text{hour} &= 20\ \text{miles} \\
          40\ \frac{\text{miles}}{\text{hour}} \times 1\ \text{hour} &= 40\ \text{miles} \\
          60\ \frac{\text{miles}}{\text{hour}} \times 1\ \text{hour} &= 60\ \text{miles}
          \end{align*}`}
        />{" "}
        All together, the car travels a total distance of{" "}
        <Latex
          value={String.raw`20\text{ miles} + 40\text{ miles} + 60\text{ miles} = 120\text{ miles}`}
        />
        .
      </p>

      <p>
        <strong>
          Notice that what we actually just calculated is the{" "}
          <span className="text-red-800 bg-red-500/20 px-1 py-px rounded">
            shaded area
          </span>{" "}
          of the graph.
        </strong>
      </p>

      <p>
        It turns out that this is true in general: The area under a velocity
        curve equals the distance. (Even if that curve is, well, curvy.)
      </p>

      <h2>Smooth Sailing</h2>
      <p>Let's try something harder.</p>
      <blockquote>
        Suppose a car begins at rest, and accelerates at a rate of{" "}
        <Latex value={String.raw`20\ \frac{\text{miles}}{\text{hour}^2}`} />.
      </blockquote>
      <p>That means that the velocity is increasing constantly, like this:</p>
      <div className="not-prose">
        <CarGraph f={fC.toString()} stopwatch={true} />
      </div>
      <blockquote>
        What is the total distance travelled after 3 hours?
      </blockquote>
      <p>
        Well, it's the{" "}
        <span className="text-red-800 bg-red-500/20 px-1 py-px rounded">
          area under the curve
        </span>{" "}
        of course!
      </p>
      <p>
        This is a triangle, and we know that the area of a triangle is{" "}
        <Latex
          value={String.raw`\frac{1}{2} \times \text{Base} \times \text{Height}`}
        />
        . In this case,{" "}
        <Latex
          displayMode
          value={String.raw`\frac{1}{2} \times 3\text{ hours} \times 60\ \frac{\text{miles}}{\text{hour}} = 90\text{ miles}`}
        />
        You might convince yourself that this is reasonable because the{" "}
        <em>average</em> speed of the car is 30mph, and it drives for 3 hours.
      </p>

      <h2>So... why is area useful?</h2>
      <p>
        If you've been following along with calculus so far, you probably have
        an intuition for how taking the derivative of a function takes you from
        position <span className="sr-only">to</span>
        <span className="not-sr-only">→</span> velocity{" "}
        <span className="sr-only">to</span>
        <span className="not-sr-only">→</span> acceleration.
      </p>
      <div className="not-prose grid grid-cols-3 gap-4">
        <div>
          <Graph window={{ xMin: -4, xMax: 4 }}>
            <GraphFunction f={((x) => x ** 3).toString()} color="blue" />
          </Graph>
          <div className="text-center font-bold mt-1">Position</div>
        </div>
        <div>
          <Graph window={{ xMin: -4, xMax: 4 }}>
            <GraphFunction f={((x) => 3 * x ** 2).toString()} color="blue" />
          </Graph>
          <div className="text-center font-bold mt-1">Velocity</div>
        </div>
        <div>
          <Graph window={{ xMin: -4, xMax: 4 }}>
            <GraphFunction f={((x) => 6 * x).toString()} color="blue" />
          </Graph>
          <div className="text-center font-bold mt-1">Acceleration</div>
        </div>
      </div>
      <Aside>
        Acceleration is followed by jerk, and then&mdash;amusingly&mdash;
        <a
          className="underline"
          href="https://en.wikipedia.org/wiki/Fourth,_fifth,_and_sixth_derivatives_of_position"
        >
          snap, crackle, and pop
        </a>
        . Which I find absolutely magical.
      </Aside>
      <p>
        In the above problems we saw that finding the <em>area</em> under a
        function moved us in the opposition direction, from velocity{" "}
        <span className="sr-only">to</span>
        <span className="not-sr-only">→</span> position. And in fact, this works
        for reversing the entire lineup. This is a very useful technique!
      </p>
      <h2>Why is finding the area the opposite of taking a derivative?</h2>
      <p>
        This seems a bit confusing at first. Taking the area under the
        function&mdash;a process which we will call "integrating"&mdash;somehow
        does the opposite of taking the derivative. But why?
      </p>
      <p>
        One way to think about it is that the derivative was like{" "}
        <strong>slope</strong> for curves, and slope is{" "}
        <Latex value={String.raw`\frac{\Delta y}{\Delta x}`} />. Derivatives are
        like <u>curvy division</u>. The integral, on the other hand, is like
        rectangular area for curves, and the area is{" "}
        <Latex value={String.raw`\Delta x \times \Delta y`} />. Integrals are
        like <u>curvy multiplication</u>.
      </p>
      <p>
        Since derivatives are like division, and integrals are like
        multiplication, perhaps it's not so surprising that they are opposites.
      </p>
    </>
  );
}
