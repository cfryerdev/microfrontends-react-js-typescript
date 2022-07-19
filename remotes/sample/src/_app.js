import React from 'react';
import { useCount } from "container/store";

const Sample = () => {
  const [count, setCount] = useCount();
  return (

    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">Home</li>
        <li className="breadcrumb-item active">Dashboard</li>
      </ol>
      <h2>Remote App - Home</h2>
      <p>This is the home remote application.</p>
      <div>
        {count}

        <button
          onClick={() => setCount(0)}
          className="bg-indigo-800 text-white font-bold py-2 px-4 rounded"
        >
          Clear Cart
        </button>
        <button
          onClick={() => {
            let newCount = count;
            console.log('test', newCount)
            setCount(newCount + 1)
          }
          }
          className="bg-indigo-800 font-bold py-2 px-4 rounded"
        >
          Add
        </button>
      </div>
    </div>
  )
};

export default Sample;
