import { useEffect, useMemo, useRef, useState } from "react";

import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import OptimizeTest from "./OptimizeTest";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments").then((res) => res.json());

    const initData = res
      .slice(0, 20)
      .map((item) => {
        return {
          id: dataId.current++,
          author: item.email,
          content: item.body,
          emotion: Math.floor(Math.random() * 5) + 1,
          created_date: new Date().getTime(),
        };
      })
      .reverse();

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

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

  const getDiaryAnalysis = useMemo(() => {
    if (!data.length) {
      return {
        goodCount: 0,
        goodRatio: 0,
        badCount: 0,
        badRatio: 0,
      };
    }

    const goodCount = data.filter((item) => item.emotion >= 3).length;
    const goodRatio = (goodCount / data.length) * 100;

    return {
      goodCount,
      goodRatio,
      badCount: data.length - goodCount,
      badRatio: (1 - goodRatio) * -1,
    };
  }, [data.length]);

  const { goodCount, goodRatio, badCount, badRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <OptimizeTest />
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기: {data.length}</div>
      <div>
        기분 좋은 일기: {goodCount} ({goodRatio}%)
      </div>
      <div>
        기분 나쁜 일기: {badCount} ({badRatio}%)
      </div>
      <DiaryList list={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
