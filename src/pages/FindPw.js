/* eslint-disable react/prop-types */
import React from "react";
import { Form, Input, Button, Icon } from "antd";
const API_HOST_URL = process.env.REACT_APP_API_HOST_URL;

class FindPw extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        let email = { email: values.email };
        fetch(`${API_HOST_URL}/users/findPassword`, {
          method: "POST",
          body: JSON.stringify(email),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => res.json())
          .then(res => {
            let message = document.getElementById("message");
            if (res.password) {
              message.innerHTML = `회원님의 비밀번호는 ${res.password}입니다.`;
            } else {
              message.innerHTML = "해당 이메일로 가입한 아이디가 없습니다.";
            }
          })
          .catch(err => console.error(err));
      }
    });
  }
  render() {
    const form = this.props.form;
    const style = { margin: "3px 3px 3px 3px" };
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
          <div id="message" style={style}>
            아이디와 이메일을 입력해 주세요.
          </div>
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator("id", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              compact="true"
              style={{ ...style, width: "50%" }}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator("email", {
            rules: [
              { required: true, message: "Please input your email address!" }
            ]
          })(
            <Input
              style={{ width: "50%" }}
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {" "}
          <Button type="primary" style={style} htmlType="submit">
            완료
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedFindPw = Form.create({ name: "find_pw" })(FindPw);

export default WrappedFindPw;
