import { useContext, useRef, useState } from "react";

import { DiaryDispatchContext } from "./App";

const DiaryItem = ({ id, author, content, emotion, created_date }) => {
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);

  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState(content);

  const localContentTextarea = useRef();

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleRemove = () => {
    window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`) && onRemove(id);
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentTextarea.current.focus();
      return;
    }

    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
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
      <div className="content">
        {isEdit ? (
          <>
            <textarea ref={localContentTextarea} value={localContent} onChange={(e) => setLocalContent(e.target.value)}></textarea>
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button type="button" onClick={handleQuitEdit}>
            취소
          </button>
          <button type="button" onClick={handleEdit}>
            완료
          </button>
        </>
      ) : (
        <>
          <button type="button" onClick={toggleIsEdit}>
            수정
          </button>
          <button type="button" onClick={handleRemove}>
            삭제
          </button>
        </>
      )}
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
