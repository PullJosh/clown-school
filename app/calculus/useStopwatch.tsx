import { useCallback, useEffect, useState } from "react";

interface StopwatchState {
  startValue: number;
  startTime: number | null;
}

export function useStopwatch(range: [number, number] = [0, Infinity]) {
  const [state, setState] = useState<StopwatchState>({
    startValue: 0,
    startTime: null,
  });

  const start = useCallback((startValue?: number) => {
    setState((state) => ({
      ...state,
      startTime: Date.now(),
      startValue: startValue === undefined ? state.startValue : startValue,
    }));
  }, []);

  const stop = useCallback(() => {
    setState((state) => ({
      ...state,
      startValue:
        state.startValue + (Date.now() - (state.startTime ?? Date.now())),
      startTime: null,
    }));
  }, []);

  const reset = useCallback(
    (value = range[0]) => {
      setState((state) => ({
        ...state,
        startValue: Math.max(range[0], Math.min(range[1], value)) * 1000,
        startTime: null,
      }));
    },
    [range]
  );

  const getTime = useCallback(
    () =>
      state.startValue + (state.startTime ? Date.now() - state.startTime : 0),
    [state.startValue, state.startTime]
  );

  const time = useContinuousCalculation(getTime, state.startTime !== null);

  useEffect(() => {
    if (time / 1000 > range[1]) {
      reset(range[1]);
    }
  }, [range, reset, time]);

  return {
    start,
    stop,
    reset,
    time: time / 1000,
    running: state.startTime !== null,
  };
}

function useContinuousCalculation<T>(fn: () => T, running = true) {
  const [value, setValue] = useState<T>(fn());

  useEffect(() => {
    if (!running) {
      setValue(fn());
      return;
    }

    let done = false;
    const loop = () => {
      if (done) return;
      setValue(fn());
      requestAnimationFrame(loop);
    };

    loop();

    return () => {
      done = true;
    };
  }, [fn, running]);

  return value;
}
