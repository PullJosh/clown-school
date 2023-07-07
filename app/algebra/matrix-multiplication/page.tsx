import MatrixMultiplicationCalculator from "./MatrixMultiplicationCalculator";

export default function MatrixMultiplication() {
  return (
    <>
      <h1>Matrix Multiplication</h1>
      <p className="lead">
        Some matrices can be multiplied together to form a new matrix.
      </p>
      <div className="not-prose">
        <MatrixMultiplicationCalculator />
      </div>
    </>
  );
}
