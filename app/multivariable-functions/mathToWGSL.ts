import { BoxedExpression } from "@cortex-js/compute-engine";

export function mathToWGSL(
  node: BoxedExpression["json"],
  symbols: {
    [name: string]: string | ((...args: string[]) => string);
  } = {},
): string {
  const symbolToGL = (symbol: string) => {
    switch (symbol) {
      case "ExponentialE":
        return "2.718281828459045";
      case "MachineEpsilon":
        return Number.EPSILON.toPrecision(21);
      case "CatalanConstant":
        return "0.915965594177219015054";
      case "GoldenRatio":
        return "1.618033988749894848204";
      case "EulerGamma":
        return "0.577215664901532860606";
      case "Degrees":
        return "57.295779513082320876798";
      case "Pi":
        return Math.PI.toPrecision(21);
      default:
        if (symbol in symbols) {
          const replacement = symbols[symbol];
          if (typeof replacement === "string") {
            return replacement;
          }
        }
        // if (symbol.length === 1) {
        //   return symbol; // Variable (use uniform value)
        // }
        throw new Error(`Unsupported symbol: ${node}`);
    }
  };

  if (typeof node === "string") {
    return symbolToGL(node);
  }

  if (typeof node === "number") {
    return node.toPrecision(21);
  }

  if ("sym" in node) {
    return symbolToGL(node.sym);
  }

  if ("num" in node) {
    switch (node.num) {
      case "NaN":
        throw new Error("NaN is not supported");
      case "Infinity":
        return "1.0 / 0.0";
      case "-Infinity":
        return "-1.0 / 0.0";
      default:
        try {
          return Number(node.num).toPrecision(21);
        } catch (err) {
          throw new Error(`Unsupported number: ${node.num}`);
        }
    }
  }

  const functionToGL = (name: string, args: string[]) => {
    switch (name) {
      case "Add":
        return `(${args.join(" + ")})`;
      case "Subtract":
        return `(${args.join(" - ")})`;
      case "Negate":
        return `(-${args[0]})`;
      case "Multiply":
        return `(${args.join(" * ")})`;
      case "Divide":
        return `(${args.join(" / ")})`;
      case "Power":
        return `pow(${args[0]}, ${args[1]})`;
      case "Root":
        return `pow(${args[0]}, 1.0 / ${args[1]})`;
      case "Sqrt":
        return `sqrt(${args[0]})`;
      case "Square":
        return `(${args[0]} * ${args[0]})`;
      case "Exp":
        return `exp(${args[0]})`;
      case "Ln":
        return `log(${args[0]})`;
      case "Log":
        return `log(${args[0]}) / log(${args[1] ?? "10"})`;
      case "Lb":
        return `log(${args[0]}) / log(2.0)`;
      case "Lg":
        return `log(${args[0]}) / log(10.0)`;
      case "Sin":
        return `sin(${args[0]})`;
      case "Cos":
        return `cos(${args[0]})`;
      case "Tan":
        return `tan(${args[0]})`;
      case "Cot":
        return `1.0 / tan(${args[0]})`;
      case "Sec":
        return `1.0 / cos(${args[0]})`;
      case "Csc":
        return `1.0 / sin(${args[0]})`;
      case "Arcsin":
        return `asin(${args[0]})`;
      case "Arccos":
        return `acos(${args[0]})`;
      case "Arctan":
        return `atan(${args[0]})`;
      case "Arctan2":
        return `atan(${args[0]}, ${args[1]})`;
      case "Acot":
        return `atan(1.0, ${args[0]})`;
      case "Asec":
        return `acos(1.0 / ${args[0]})`;
      case "Acsc":
        return `asin(1.0 / ${args[0]})`;
      case "Sinh":
        return `sinh(${args[0]})`;
      case "Cosh":
        return `cosh(${args[0]})`;
      case "Tanh":
        return `tanh(${args[0]})`;
      case "Coth":
        return `1.0 / tanh(${args[0]})`;
      case "Sech":
        return `1.0 / cosh(${args[0]})`;
      case "Csch":
        return `1.0 / sinh(${args[0]})`;
      case "Arsinh":
        return `asinh(${args[0]})`;
      case "Arcosh":
        return `acosh(${args[0]})`;
      case "Artanh":
        return `atanh(${args[0]})`;
      case "Arcoth":
        return `atanh(1.0 / ${args[0]})`;
      case "Asech":
        return `acosh(1.0 / ${args[0]})`;
      case "Acsch":
        return `asinh(1.0 / ${args[0]})`;
      case "Abs":
        return `abs(${args[0]})`;
      case "Ceil":
        return `ceil(${args[0]})`;
      case "Floor":
        return `floor(${args[0]})`;
      case "Round":
        return `round(${args[0]})`;
      case "Clamp":
        return `clamp(${args[0]}, ${args[1] ?? "-1"}, ${args[2] ?? "1"})`;
      case "Max":
        return `max(${args.join(", ")})`;
      case "Min":
        return `min(${args.join(", ")})`;
      case "Rational":
        return `(${args[0]} / ${args[1] ?? "1.0"})`;
      case "Delimiter":
        return `(${args[0]})`;
      default: {
        const replacement = symbols[name];
        if (typeof replacement === "function") {
          return replacement(...args);
        }
      }
    }

    throw new Error(`Unsupported function: ${name}`);
  };

  if (Array.isArray(node)) {
    const fnName = node[0];
    if (typeof fnName !== "string") {
      throw new Error(`Unsupported function name: ${fnName}`);
    }
    if (fnName === "Error") {
      throw new Error("Expression contains error");
    }
    const args = node.slice(1).map((node) => mathToWGSL(node, symbols));
    return functionToGL(fnName, args);
  }

  if ("fn" in node) {
    const fnName = node.fn[0];
    if (typeof fnName !== "string") {
      throw new Error(`Unsupported function name: ${fnName}`);
    }
    if (fnName === "Error") {
      throw new Error("Expression contains error");
    }
    const args = node.fn.slice(1).map((node) => mathToWGSL(node, symbols));
    return functionToGL(fnName, args);
  }

  if ("str" in node) {
    return JSON.stringify(node.str);
  }

  if ("dict" in node) {
    throw new Error("MathJSON dictionaries are not supported");
  }

  function assertNever(shouldBeNever: never) {}
  assertNever(node);

  throw new Error(`Unsupported node: ${node}`);
}
