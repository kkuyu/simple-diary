import React, { useCallback, useEffect, useMemo, useRef, useReducer } from "react";

import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "EDIT": {
      return state.map((item) => {
        return item.id === action.targetId ? { ...item, content: action.newContent } : item;
      });
    }
    case "REMOVE": {
      return state.filter((item) => item.id !== action.targetId);
    }
    default: {
      return state;
    }
  }
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

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

    dispatch({ type: "INIT", data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        author,
        content,
        emotion,
      },
    });
    dataId.current += 1;
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onEdit, onRemove };
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
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor />
          <div>전체 일기: {data.length}</div>
          <div>
            기분 좋은 일기: {goodCount} ({goodRatio}%)
          </div>
          <div>
            기분 나쁜 일기: {badCount} ({badRatio}%)
          </div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
