/* eslint-disable react/prop-types */
import React from "react";
import { Form, Input, Button, Icon } from "antd";
const API_HOST_URL = process.env.REACT_APP_API_HOST_URL;

class FindId extends React.Component {
  handleClick = e => {
    e.preventDefault();
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        let email = { email: `${values.email}` };
        fetch(`${API_HOST_URL}/users/findId`, {
          method: "POST",
          body: JSON.stringify(email),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => res.json())
          .then(res => {
            let message = document.getElementById("message");
            if (res.username) {
              message.innerHTML = `회원님의 아이디는 ${res.username}입니다.`;
            } else {
              message.innerHTML = "해당 이메일로 가입한 아이디가 없습니다.";
            }
          })
          .catch(err => console.error(err));
      }
    });
  };
  render() {
    const form = this.props.form;
    return (
      <Form
        className="login-form"
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          width: "80%",
          transform: "translate(-50%, -50%)",
          textAlign: "center"
        }}
        onSubmit={this.handleClick}
      >
        <Form.Item>
          <div id="message" style={{ margin: "3px 3px 3px 3px" }}>
            이메일을 입력해 주세요.
          </div>
        </Form.Item>

        <Form.Item>
          {form.getFieldDecorator("email", {
            rules: [
              { required: true, message: "Please input your email address!" }
            ]
          })(
            <Input
              style={{ width: "45%" }}
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="email"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ margin: "3px 3px 3px 3px" }}
          >
            완료
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedFindId = Form.create({ name: "find_id" })(FindId);

export default WrappedFindId;
