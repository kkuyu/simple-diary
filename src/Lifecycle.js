import { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log("mount");
    return () => {
      console.log("unmount");
    };
  }, []);
  return <span>UnmountTest</span>;
};

const Lifecycle = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const toggleIsVisible = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    console.log("mount!");
  }, []);

  useEffect(() => {
    console.log("update!");
  });

  useEffect(() => {
    console.log("count:", count);
    if (count > 5) {
      alert("count를 초기화합니다.");
      setCount(0);
    }
  }, [count]);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => setCount(count + 1)}>plus</button>
      <span>{count}</span>
      <br />
      <button type="button" onClick={toggleIsVisible}>
        Toggle
      </button>
      {isVisible && <UnmountTest />}
    </div>
  );
};

export default Lifecycle;
