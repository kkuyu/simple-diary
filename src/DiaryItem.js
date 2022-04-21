const DiaryItem = ({ id, author, content, emotion, created_date, onRemove }) => {
  const handleRemove = (id) => {
    window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`) && onRemove(id);
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자: {author} | 감정: {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">{content}</div>
      <button type="button" onClick={() => handleRemove(id)}>
        삭제하기
      </button>
    </div>
  );
};

DiaryItem.defaultProps = {
  id: 0,
  author: "",
  content: "",
  emotion: "",
  created_date: 0,
};

export default DiaryItem;
