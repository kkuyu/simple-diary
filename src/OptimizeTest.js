import React, { useState, useEffect } from "react";

const TextView = React.memo(({ text }) => {
  useEffect(() => {
    console.log("text:", text);
  });
  return <div>{text}</div>;
});

const CountView = React.memo(({ count }) => {
  useEffect(() => {
    console.log("count:", count);
  });
  return <div>{count}</div>;
});

const IndexView = React.memo(({ index }) => {
  useEffect(() => {
    console.log("index:", index);
  });
  return <div>{index}</div>;
});

const ObjView = ({ obj }) => {
  useEffect(() => {
    console.log("obj.index:", obj.index);
  });
  return <div>{obj.index}</div>;
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.obj.count === nextProps.obj.count;
};

const MemoizedCounterB = React.memo(ObjView, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");

  const [index, setIndex] = useState(1);
  const [obj, setObj] = useState({
    index: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>count</h2>
        <CountView count={count} />
        <button type="button" onClick={() => setCount(count + 1)}>
          plus
        </button>
      </div>
      <div>
        <h2>text</h2>
        <TextView text={text} />
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      </div>

      <div>
        <h2>index</h2>
        <IndexView index={index} />
        <button type="button" onClick={() => setIndex(index)}>
          refresh?
        </button>
      </div>
      <div>
        <h2>obj</h2>
        <MemoizedCounterB obj={obj} />
        <button type="button" onClick={() => setObj({ index: obj.index })}>
          refresh?
        </button>
      </div>
    </div>
  );
};

export default OptimizeTest;
