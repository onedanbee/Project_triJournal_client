/* eslint-disable react/prop-types */
import React from "react";
import { Upload, Icon, message } from "antd";
const API_HOST_URL = process.env.REACT_APP_API_HOST_URL;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class UploadProfile extends React.Component {
  state = {
    loading: false
  };

  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.props.setImageUrl(info.file.response.imageUrl);
        this.setState({
          imageUrl,
          loading: false
        });
      });
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    const props = {
      name: "image",
      listType: "picture-card",
      className: "avatar-uploader",
      showUploadList: false,
      action: `${API_HOST_URL}/users/postUserProfilePic`
    };
    return (
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          width: "100%",
          transform: "translate(-50%, -50%)",
          textAlign: "center"
        }}
      >
        <Upload
          {...props}
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </div>
    );
  }
}

export default UploadProfile;
