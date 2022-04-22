import { useRef, useState } from "react";

import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Lifecycle from "./Lifecycle";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      id: dataId.current,
      author,
      content,
      emotion,
      created_date,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onEdit = (targetId, newContent) => {
    const newData = data.map((item) => {
      if (item.id === targetId) {
        return { ...item, content: newContent };
      }
      return item;
    });
    setData(newData);
  };

  const onRemove = (targetId) => {
    const newData = data.filter((item) => item.id !== targetId);
    setData(newData);
  };

  return (
    <div className="App">
      <Lifecycle />
      <DiaryEditor onCreate={onCreate} />
      <DiaryList list={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
