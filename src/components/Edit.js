/* eslint-disable react/prop-types */
import React from "react";
import { Modal, Input, message } from "antd";
import UploadImage from "./UploadImage";

class Edit extends React.Component {
  state = { fileList: [] };
  handleOk = () => {
    let editBest = document.getElementById("editBest").value;
    let editWorst = document.getElementById("editWorst").value;
    let editTodo = document.getElementById("editTodo").value;
    let editPic = this.state.fileList.length
      ? this.state.fileList[0].url
      : this.props.diary.picUrl;
    let body = {
      ...this.props.diary,
      best: editBest,
      worst: editWorst,
      todo: editTodo,
      picUrl: editPic
    };
    this.props.hideModal();
    message.success("수정 성공");
    this.props.editDiary(body, this.props.diary.id);
  };

  handleCancel = () => {
    this.props.hideModal();
    message.error("수정 취소");
  };
  handleImageUpload = fileList => {
    this.setState({ fileList: fileList });
  };
  render() {
    const diary = this.props.diary;
    const isVisible = this.props.isVisible;
    const fileList = this.state.fileList;
    return (
      <Modal
        title={diary.createdAt.slice(0, 10)}
        visible={isVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Input
          id="editBest"
          placeholder="오늘 가장 좋았던 일"
          defaultValue={diary.best}
        />
        <Input
          id="editWorst"
          placeholder="오늘 가장 나빴던 일"
          defaultValue={diary.worst}
        />
        <Input
          id="editTodo"
          placeholder="내일 할 일"
          defaultValue={diary.todo}
        />
        <UploadImage
          currentUser={diary.userName}
          imageUpload={this.handleImageUpload}
          fileList={fileList}
        />
      </Modal>
    );
  }
}

export default Edit;
