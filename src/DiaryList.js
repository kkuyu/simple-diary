import DiaryItem from "./DiaryItem";

const DiaryList = ({ list, onDelete }) => {
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{list.length}개의 일기가 있습니다.</h4>
      <div>
        {list.map((item) => (
          <DiaryItem key={item.id} {...item} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  list: [],
};

export default DiaryList;
