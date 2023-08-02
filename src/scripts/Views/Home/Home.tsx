import {useState} from "react";

export function Component() {
  const [count, setCount] = useState<number>(0);

  function upCount() {

    setCount(count + 5);

  }


  return (
    <div>
      <button
        type="button"
        className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={upCount}
      >
        Button text
      </button>
      <div>count: {count}</div>
    </div>
  );
}

export default Component;
