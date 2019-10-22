/* eslint-disable react/prop-types */
import React from "react";
import { Card, Icon, Popconfirm, message } from "antd";
import Edit from "./Edit";

class Diary extends React.Component {
  state = { isVisible: false };
  handleConfirmDelete = () => {
    message.success("삭제 완료");
    this.props.deleteDiary(this.props.diary.id);
  };
  handleCancelDelete = () => {
    message.error("삭제 취소");
  };
  showModal = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };
  hideModal = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };
  editDiary = (body, diaryId) => {
    this.props.editDiary(body, diaryId);
  };
  render() {
    const { Meta } = Card;
    const loading = this.props.loading;
    const diary = this.props.diary;
    const isVisible = this.state.isVisible;
    return (
      <Card
        style={{ width: 400, margin: "1% 1% 1% 1%" }}
        loading={loading}
        cover={
          diary.picUrl ? (
            <img alt={diary.createdAt} src={diary.picUrl} />
          ) : (
            undefined
          )
        }
        actions={[
          <Icon type="edit" key="edit" onClick={this.showModal} />,
          <Popconfirm
            key="delete"
            title="일기를 지우시겠습니까?"
            onConfirm={this.handleConfirmDelete}
            onCancel={this.handleCancelDelete}
            okText="Yes"
            cancelText="No"
          >
            <Icon type="delete" key="delete" />
          </Popconfirm>,
          <Icon type="file-text" key="file-text" />
        ]}
      >
        {loading ? (
          <Meta />
        ) : (
          <Meta
            title={diary.createdAt.slice(0, 10)}
            description={
              <div>
                <p>1. {diary.best}</p>
                <p>2. {diary.worst}</p>
                <p>3. {diary.todo}</p>
              </div>
            }
          />
        )}
        <Edit
          isVisible={isVisible}
          hideModal={this.hideModal}
          diary={diary}
          editDiary={this.editDiary}
        />
      </Card>
    );
  }
}

export default Diary;
