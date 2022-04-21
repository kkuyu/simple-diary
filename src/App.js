import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const dummyList = [
  {
    id: 1,
    author: "author1",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    emotion: "5",
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "author2",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    emotion: "3",
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "author3",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    emotion: "4",
    created_date: new Date().getTime(),
  },
];

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList list={dummyList} />
    </div>
  );
}

export default App;
