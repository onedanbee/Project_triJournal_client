/* eslint-disable react/prop-types */
import React from "react";
import { Empty } from "antd";
import Diary from "../components/Diary";
import WrappedInputDiary from "../components/InputDiary";

const Write = props => {
  const diaries = props.diaries;
  const loading = props.loading;
  const postDiary = diary => {
    props.postDiary(diary);
  };
  const deleteDiary = postId => {
    props.deleteDiary(postId);
  };
  const editDiary = (body, postId) => {
    props.editDiary(body, postId);
  };

  return (
    <div>
      <WrappedInputDiary
        postDiary={postDiary}
        currentUser={props.currentUser}
      />
      {!diaries.length && !loading ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span>첫 번째 일기를 써보세요!</span>}
        />
      ) : (
        diaries
          .sort((a, b) => b.id - a.id)
          .slice(0, 10)
          .map((diary, i) => {
            return (
              <Diary
                diary={diary}
                loading={loading}
                key={i}
                deleteDiary={deleteDiary}
                editDiary={editDiary}
              />
            );
          })
      )}
    </div>
  );
};

export default Write;
