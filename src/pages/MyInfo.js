import React, { useState } from "react";
import { Upload, Icon, message, Button } from "antd";

//server쪽 추가하기

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = file => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const MyInfo = () => {
  const [myInfoState, setmyInfoState] = useState({
    loading: false,
    imageUrl: null
  });
  const { loading, imageUrl } = myInfoState;

  const handleChange = info => {
    if (info.file.status === "uploading") {
      setmyInfoState({
        ...myInfoState,
        loading: true
      });
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, imageUrl =>
        setmyInfoState({
          ...myInfoState,
          imageUrl: imageUrl,
          loading: false
        })
      );
    }
  };
  const uploadButton = (
    <div>
      <Icon type={loading ? "loading" : "plus"} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const handleClickImgUpdate = () => {
    if (imageUrl !== null) {
      //서버로 user의 img 정보를 보낸다.
      alert("프로필 수정이 완료되었습니다.");
    }
  };

  return (
    <div style={{ position: "absolute" }}>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
      <Button onClick={handleClickImgUpdate}>사진 업데이트</Button>
    </div>
  );
};

export default MyInfo;
