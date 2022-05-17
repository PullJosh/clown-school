import { useRef } from "react";
import { Latex } from "../components/Latex";

export default function HomePage() {
  const sequenceScrollRef = useRef(null);

  const scrollRight = () => {
    if (sequenceScrollRef.current) {
      const width = sequenceScrollRef.current.offsetWidth;
      sequenceScrollRef.current.scrollBy({
        left: width * 0.8,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-2xl text-base sm:text-lg leading-relaxed mx-auto p-8 text-gray-900 relative text-justify">
      <h1 className="font-bold text-4xl sm:text-5xl mb-2 text-left">
        What is a sequence?
      </h1>
      <div className="italic text-gray-600 mb-6">
        tl;dr: A sequence is an infinitely long list of numbers.
      </div>
      <p>
        Take a look at this <strong>sequence</strong> of fractions:
      </p>
      <div className="relative select-none">
        <div className="relative my-4 shadow-inner border bg-gray-50 rounded-lg overflow-hidden">
          <div className="overflow-x-auto" ref={sequenceScrollRef}>
            <div className="flex divide-x">
              {new Array(100).fill(null).map((_, n) => (
                <div
                  key={n}
                  className="shrink-0 flex flex-col items-stretch divide-y"
                >
                  <div className="px-2 py-2 flex justify-center">
                    <Pizza numerator={n + 1} denominator={n + 2} />
                  </div>
                  <div className="px-2 text-lg text-center text-gray-500">
                    {n + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className="absolute top-0 h-full right-0 w-20 bg-gradient-to-l from-gray-50 flex justify-end items-center"
            onClick={scrollRight}
          >
            <div className="w-7 h-7 mr-2 rounded-full border border-gray-300 bg-white text-gray-500 flex justify-center items-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 translate-x-[-16%]">
                <polyline
                  points="12,3 21,12 12,21"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth={3}
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
      <p className="mb-3">
        Notice how the sequence is infinitely long (you can keep scrolling
        forever) and each term of the sequence is labeled with a number.
      </p>
      <p>
        These numbers, starting with 1 and counting up, are called the “natural
        numbers”, sometimes indicated by the symbol{" "}
        <Latex value={String.raw`\mathbb{N}`} />:
      </p>
      <Latex
        value={String.raw`\mathbb{N} = \{ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,... \}`}
        displayMode={true}
      />
      <p>
        Since each natural number corresponds to a term in the pizza sequence,
        we say that our sequence is “indexed by” the natural numbers.
      </p>
      <Aside>
        <p>
          It's also possible to have a sequence that is indexed by some other
          set, like the integers:{" "}
          <Latex
            value={String.raw`\mathbb{Z} = \{ ..., -2, -1, 0, 1, 2,... \}`}
          />
          . That kind of sequence would be infinite in both directions, not just
          to the right.
        </p>
      </Aside>
      <h2 className="font-bold text-2xl sm:text-3xl mt-6 mb-1 text-left">
        Notation for Sequences
      </h2>
      <p className="mb-3">
        You can think of a sequence like a function that assigns a value to each
        natural number. For example, our pizza sequence is a little bit like the
        function <Latex value={String.raw`f(n) = \frac{n}{n + 1}`} />. (Because
        <Latex value={String.raw`f(1) = \frac 12`} />,{" "}
        <Latex value={String.raw`f(2) = \frac 23`} />, and so on.)
      </p>
      <p className="mb-3">
        But we don't generally use function notation for sequences. Instead, we
        would write it like this:
        <Latex
          value={String.raw`\left(\frac{n}{n+1}\right)_{n \in \mathbb{N}}`}
          displayMode={true}
        />
        This notation basically means "compute{" "}
        <Latex value={String.raw`\frac{n}{n + 1}`} /> for all{" "}
        <Latex value="n" /> in <Latex value={String.raw`\mathbb{N}`} />
        ". Which makes sense! That's exactly what our sequence is.
      </p>
      <p className="mb-3">
        But sometimes we don't know exactly what our sequence is. When writing
        proofs, we will often discuss{" "}
        <span className="text-indigo-800 font-semibold">
          🎩 mystery sequences
        </span>
        , where we know some <i>properties</i> of the sequence but not its exact
        values. In that case, we can't write an exact formula for the terms, so
        we just write
        <Latex
          value={String.raw`(x_n)_{n \in \mathbb{N}}`}
          displayMode={true}
        />
        instead. Here, <Latex value="x_n" /> is a mystery function that has an
        unknown value for each <Latex value="n" />.
      </p>
      <Aside>
        <p>
          If you're in the mood for using mystery notation, you could describe
          the pizza sequence as "
          <Latex value={String.raw`(x_n)_{n \in \mathbb{N}}`} /> where{" "}
          <Latex value={String.raw`x_n = \frac{n}{n+1}`} /> for all{" "}
          <Latex value="n" /> in <Latex value={String.raw`\mathbb{N}`} />
          ". Of course, once you describe what the values of{" "}
          <Latex value="x_n" /> are, you really ruin the mystery.
        </p>
      </Aside>
      <h2 className="font-bold text-2xl sm:text-3xl mt-6 mb-1 text-left">
        Graphing Sequences
      </h2>
      <p>
        When we're trying to understand the behavior of a sequence, it can be
        very useful to graph its values. Since our sequence is just a list of
        real numbers, we can graph it like this:
      </p>
    </div>
  );
}

function Aside({ children }) {
  return (
    <div className="bg-gray-100 rounded border px-3 py-2 my-3 text-gray-600 text-left text-sm sm:italic sm:my-0 sm:absolute sm:right-0 sm:translate-x-full sm:-translate-y-full sm:w-64 sm:text-base sm:bg-transparent sm:border-0 sm:border-l-4 sm:rounded-none sm:py-0">
      <h5 className="uppercase font-semibold not-italic sm:hidden">
        Side note
      </h5>
      {children}
    </div>
  );
}

function Pizza({ numerator, denominator }) {
  const angle = Math.PI / 2 - 2 * Math.PI * (numerator / denominator);

  return (
    <div className="flex flex-col justify-center items-center relative space-y-2">
      <svg viewBox="0 0 100 100" className="w-10 h-10">
        <defs>
          <clipPath id={`cut-fraction-${numerator}-${denominator}`}>
            <path
              d={`M 50 0 L 50 50 L ${50 + 50 * Math.cos(angle)} ${
                50 - 50 * Math.sin(angle)
              } A 50 50 0 1 0 50 0`}
            />
          </clipPath>
          <pattern
            id="pizza-pattern"
            patternUnits="userSpaceOnUse"
            width="100"
            height="100"
          >
            <circle cx={50} cy={50} r={50} fill="#d8ab63" />
            <path
              d="M51 8c8 .333 15.847 5.529 23 10 8 5 11.544 8.455 15 14 3.456 5.545 5.981 17.824 3 27-2.981 9.176-3.773 13.934-11 20-7.227 6.066-15.124 14.165-29 14-13.876-.165-18.731-4.481-25-10-6.269-5.519-13.334-8.632-16-19-2.666-10.368-2.335-18.539 1-27 3.335-8.461 5.451-13.548 12-19S43 7.667 51 8z"
              fill="#ffda79"
            />
            <circle
              cx={44}
              cy={34}
              r={9}
              fill="#891d0a"
              transform="translate(8.722 -1.056) scale(.72222)"
            />
            <circle
              cx={44}
              cy={34}
              r={9}
              fill="#891d0a"
              transform="translate(34.722 4.944) scale(.72222)"
            />
            <circle
              cx={44}
              cy={34}
              r={9}
              fill="#891d0a"
              transform="translate(18.722 22.944) scale(.72222)"
            />
            <circle
              cx={44}
              cy={34}
              r={9}
              fill="#891d0a"
              transform="translate(-7.278 17.944) scale(.72222)"
            />
            <circle
              cx={44}
              cy={34}
              r={9}
              fill="#891d0a"
              transform="translate(-4.278 40.944) scale(.72222)"
            />
            <circle
              cx={44}
              cy={34}
              r={9}
              fill="#891d0a"
              transform="translate(16.722 55.944) scale(.72222)"
            />
            <circle
              cx={44}
              cy={34}
              r={9}
              fill="#891d0a"
              transform="translate(43.722 36.944) scale(.72222)"
            />
            <path
              d="M65 46c-.167 1 2.313 4.843 4 4 2.333-1.167 7.167-8.667 10-11 1.96-1.614 6.5-1.833 7-3s-2.313-4.843-4-4c-2.667 1.333-9.167 9.667-12 12-1.386 1.141-4.833 1-5 2z"
              fill="#208019"
              transform="translate(.424 3.88)"
            />
            <path
              d="M65 46c-.167 1 2.313 4.843 4 4 2.333-1.167 8.207-7.684 10-11 1.415-2.618 1.028-7.667.757-8.896-.203-.921-1.841.752-2.383 1.524C75.748 33.944 72.062 41.605 70 44c-1.171 1.36-4.833 1-5 2z"
              fill="#208019"
              transform="rotate(77.601 48.325 44.363)"
            />
            <path
              d="M65.644 49.361c-.167 1 2.456 1.337 3.356.639 2.226-1.727 7.902-7.94 10-11 1.471-2.146 2.862-6.134 2.591-7.363-.271-1.229-3.256-1.034-4.217-.009C75.442 33.689 71.955 41.044 70 44c-1.27 1.921-4.19 4.361-4.356 5.361z"
              fill="#208019"
              transform="matrix(.50394 .56112 -.56215 .50486 20.555 -7.139)"
            />
            <path
              d="M65.644 49.361c-.167 1 2.456 1.337 3.356.639 2.226-1.727 6.285-7.963 10-11 3.679-3.007 12.116-6.118 12.292-7.221.176-1.103-7.982-1.265-11.234.602C76.509 34.418 72.402 41.17 70 44c-1.49 1.755-4.19 4.361-4.356 5.361z"
              fill="#208019"
              transform="matrix(.50394 .56112 -.56215 .50486 26.859 -28.27)"
            />
            <path
              d="M72.027 44.663c.572 1.041 3.024 1.714 4.109.833C77.298 44.552 77.245 40.588 79 39c2.526-2.286 12.116-6.118 12.292-7.221.176-1.103-8.136-.643-11.234.602-3.099 1.245-6.019 4.82-7.357 6.867-.996 1.522-1.247 4.374-.674 5.415z"
              fill="#208019"
              transform="matrix(-.09132 .74865 -.75002 -.09148 89.775 -37.727)"
            />
            <path
              d="M72.027 44.663c.572 1.041 3.024 1.714 4.109.833C77.298 44.552 77.245 40.588 79 39c2.526-2.286 12.116-6.118 12.292-7.221.176-1.103-8.136-.643-11.234.602-3.099 1.245-6.019 4.82-7.357 6.867-.996 1.522-1.247 4.374-.674 5.415z"
              fill="#f2f3c6"
              transform="matrix(-.7448 -.11868 .1189 -.74616 122.723 117.153)"
            />
            <path
              d="M76.407 47.809c.493.626 1.531-.856 1.756-1.619.432-1.468-.788-5.406.837-7.19 2.188-2.402 11.763-6.302 12.292-7.221.53-.918-6.246.558-9.115 1.711-3.098 1.244-8.515 3.371-9.476 5.758-.962 2.386 2.796 7.404 3.706 8.561z"
              fill="#f2f3c6"
              transform="matrix(-.7448 -.11868 .1189 -.74616 93.224 108.741)"
            />
            <path
              d="M67.61 37.087c.143.895 6.772 5.977 9.076 6.392 2.016.364 3.149-2.62 4.748-3.9 2.434-1.95 9.734-6.785 9.858-7.8.124-1.015-6.537.656-9.115 1.711-2.421.99-3.921 4.017-6.349 4.616-2.428.6-8.361-1.915-8.218-1.019z"
              fill="#f2f3c6"
              transform="matrix(-.7448 -.11868 .1189 -.74616 89.947 83.197)"
            />
            <path
              d="M68.846 44.832c.143.896 5.742-.477 7.84-1.353 1.89-.789 3.149-2.62 4.748-3.9 2.434-1.95 9.734-6.785 9.858-7.8.124-1.015-6.537.656-9.115 1.711-2.421.99-4.356 2.921-6.349 4.616-2.222 1.891-7.125 5.831-6.982 6.726z"
              fill="#f2f3c6"
              transform="matrix(-.19936 -.72737 .7287 -.19972 53.681 107.116)"
            />
            <circle
              cx={26.487}
              cy={23.487}
              r={2.487}
              fill="none"
              stroke="#000"
              strokeWidth="2px"
              transform="translate(0 4.026)"
            />
            <circle
              cx={26.487}
              cy={23.487}
              r={2.487}
              fill="none"
              stroke="#000"
              strokeWidth="2px"
              transform="translate(24.502 4.026)"
            />
            <circle
              cx={26.487}
              cy={23.487}
              r={2.487}
              fill="none"
              stroke="#000"
              strokeWidth="2px"
              transform="translate(-6 31.244)"
            />
            <circle
              cx={26.487}
              cy={23.487}
              r={2.487}
              fill="none"
              stroke="#000"
              strokeWidth="2px"
              transform="translate(36.442 40)"
            />
            <circle
              cx={26.487}
              cy={23.487}
              r={2.487}
              fill="none"
              stroke="#000"
              strokeWidth="2px"
              transform="translate(56 26.27)"
            />
            <circle
              cx={26.487}
              cy={23.487}
              r={2.487}
              fill="none"
              stroke="#000"
              strokeWidth="2px"
              transform="translate(11 56.153)"
            />
            <circle
              cx={26.487}
              cy={23.487}
              r={2.487}
              fill="none"
              stroke="#000"
              strokeWidth="2px"
              transform="translate(15.974 34.955)"
            />
            <circle
              cx={26.487}
              cy={23.487}
              r={2.487}
              fill="none"
              stroke="#000"
              strokeWidth="2px"
              transform="translate(34.498 20.574)"
            />
            <circle
              cx={26.487}
              cy={23.487}
              r={2.487}
              fill="none"
              stroke="#000"
              strokeWidth="2px"
              transform="translate(53.026 6.718)"
            />
            <path
              d="M55.487 17v24.487V17zm-13.256 3.281l13.256 21.206-13.256-21.206zm-9.705 8.963l22.961 12.243-22.961-12.243zm-3.552 12.243h26.513-26.513zm3.552 12.244l22.961-12.244-22.961 12.244zm9.705 8.962l13.256-21.206-13.256 21.206zm13.256 3.281V41.487v24.487zm13.257-3.281L55.487 41.487l13.257 21.206zm9.704-8.962L55.487 41.487l22.961 12.244zM82 41.487H55.487 82zm-3.552-12.243L55.487 41.487l22.961-12.243zm-9.704-8.963L55.487 41.487l13.257-21.206z"
              fill="none"
              stroke="#000"
              strokeOpacity={0.2}
              strokeWidth="1.02px"
              strokeLinecap="butt"
              transform="matrix(1.88558 -.00028 .0003 2.0422 -54.638 -34.71)"
            />
          </pattern>
        </defs>
        <circle
          cx={50}
          cy={50}
          r={50}
          clipPath={`url(#cut-fraction-${numerator}-${denominator})`}
          fill="url(#pizza-pattern)"
        />
      </svg>
      <div className="text-base">
        <Latex value={String.raw`${numerator} / ${denominator}`} />
      </div>
    </div>
  );
}