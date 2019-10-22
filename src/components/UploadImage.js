/* eslint-disable react/prop-types */
import React from "react";
import { Upload, Icon, Button } from "antd";
const API_HOST_URL = process.env.REACT_APP_API_HOST_URL;

const UploadImage = props => {
  const img = {
    action: `${API_HOST_URL}/posts/${props.currentUser}/postJournalPic`, //사진을 올릴 URL
    listType: "picture", // 프리뷰 모양
    onChange(info) {
      let fileList = info.fileList.slice(-1); // fileList의 lengt를 1로 고정. 최근 업로드된 파일만 남아있음.
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.imageUrl;
        }
        return file;
      });
      props.imageUpload(fileList);
    },
    onRemove() {
      props.imageUpload([]);
    }
  };
  return (
    <span>
      {/* eslint-disable-next-line react/prop-types*/}
      <Upload {...img} name="image" fileList={props.fileList}>
        <Button>
          <Icon type="upload" /> Upload
        </Button>
      </Upload>
    </span>
  );
};

export default UploadImage;
