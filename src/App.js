import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

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

  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      id: dataId.current,
      author,
      content,
      emotion,
      created_date,
    };
    dataId.current += 1;
    setData((data) => [newItem, ...data]);
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    setData((data) =>
      data.map((item) => {
        return item.id === targetId
          ? { ...item, content: newContent }
          : item;
      })
    );
  }, []);

  const onRemove = useCallback((targetId) => {
    setData((data) => data.filter((item) => item.id !== targetId));
  }, []);

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
