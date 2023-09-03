import { useState } from "react";
import type { FunctionComponent, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import "../i18n/i18n";

interface CounterProps {
  count: number;
}

const Counter: FunctionComponent<PropsWithChildren<CounterProps>> = ({
  children,
  count: initialCount,
}) => {
  const { t } = useTranslation("translation");
  const [count, setCount] = useState(initialCount);
  const add = () => setCount((i: number) => i + 1);
  const subtract = () => setCount((i: number) => i - 1);

  return (
    <>
      <div className="counter">
        <button onClick={subtract}>-</button>
        <pre>Count: {count} </pre>
        <button onClick={add}>+</button>
      </div>
      <div className="counter-message">{children}</div>
    </>
  );
};

export default Counter;

