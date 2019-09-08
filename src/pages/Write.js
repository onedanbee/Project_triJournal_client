import React, { useState, useEffect } from "react";
import { Input, Button, Empty } from "antd";
import setDataToState from "../modules/setDataToState";
import Diary from "./Diary";
import UploadImage from "./UploadImage";

const Write = () => {
  const style = {
    margin: "3px 3px 3px 3px"
  };
  const InputGroup = Input.Group;
  const [loading, setLoading] = useState(true);
  const [diaries, setDiaries] = useState([{}]);
  const [journal, setJournal] = useState({
    best: "",
    worst: "",
    todo: "",
    image: undefined
  });

  const { best, worst, todo, image } = journal;

  const fetchDiary = async () => {
    // const diaries = await fetch("https://koreanjson.com/todos").then(res =>
    //   res.json()
    // );
    const diaries = [
      {
        id: 1,
        best: "ㅇㅋ",
        worst: "으악",
        todo: "밥먹기",
        createdAt: "1234567891"
      }
    ];
    setDiaries(diaries);
    setLoading(false);
  };
  useEffect(() => {
    fetchDiary();
  }, []);
  const handleChange = e => {
    setDataToState(e.target.id, setJournal, journal);
  };
  const handleClick = () => {
    // 서버로 post 요청을 보낸다.
  };
  const setImage = file => {
    setJournal({ ...journal, image: file });
  };
  return (
    <div style={{ width: "50%", margin: "0 50px 0 50px" }}>
      <InputGroup style={{ width: "70%" }}>
        <Input
          id="best"
          onChange={handleChange}
          style={style}
          placeholder="오늘 가장 좋았던 일"
        />
        <Input
          id="worst"
          onChange={handleChange}
          style={style}
          placeholder="오늘 가장 나빴던 일"
        />
        <Input
          id="todo"
          onChange={handleChange}
          style={style}
          placeholder="내일 할 일"
        />
      </InputGroup>
      <Button
        onClick={handleClick}
        style={style}
        disabled={best.length && worst.length && todo.length ? false : true}
      >
        작성
      </Button>
      <UploadImage setImage={setImage} currentImage={image} />
      {!diaries[0].id && !loading ? ( // 들어온 다이어리에 id가 배정되어 있지 않다면 초기에 스테이트로 설정된 빈 오브젝트이므로
        <Empty // Empty 컴포넌트 돌려줌.
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span>첫 번째 일기를 써보세요!</span>}
        />
      ) : (
        diaries
          .slice(0, 10)
          .map((diary, i) => <Diary diary={diary} loading={loading} key={i} />)
      )}
    </div>
  );
};

export default Write;
