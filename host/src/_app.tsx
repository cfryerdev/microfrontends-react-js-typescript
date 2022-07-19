import { BrowserRouter } from "react-router-dom";
// @ts-ignore
import { CountProvider, useCount } from "container/store";
import Routing from "./_routing";

const HostRouter = () => {
  const [count, setCount] = useCount();

  return (
    <BrowserRouter>
      <div>Name: host</div>
      <div>Count: {count}</div>
      <div>
        <button
          // @ts-ignore
          onClick={() => setCount(count + 1)}
          className="bg-indigo-800 font-bold py-2 px-4 rounded"
        >
          Add To Cart
        </button>
      </div>
      <Routing />
    </BrowserRouter>

  )
};

export default HostRouter;