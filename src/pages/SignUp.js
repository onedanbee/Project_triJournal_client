/* eslint-disable react/prop-types */
import React from "react";
import { Button, Input, Form, Icon } from "antd";
import UploadProfile from "../components/UploadProfile";
const API_HOST_URL = process.env.REACT_APP_API_HOST_URL;

class SignUp extends React.Component {
  state = {
    isIdUnique: false,
    pwCheck: false,
    isEmailUnique: false,
    imageUrl: ""
  };
  handleClickConfirm = e => {
    e.preventDefault();
    const { form } = this.props;
    if (!this.state.isIdUnique) {
      alert("아이디 중복 검사를 해 주세요.");
    } else if (!this.state.isEmailUnique) {
      alert("이메일 중복 검사를 해 주세요.");
    } else {
      form.validateFields((err, values) => {
        if (!err) {
          let userInfo = {
            username: values.id,
            email: values.email,
            password: values.password,
            userProfilePic: this.state.imageUrl.length
              ? this.state.imageUrl
              : undefined
          };
          fetch(`${API_HOST_URL}/users/signUp`, {
            method: "POST",
            body: JSON.stringify(userInfo),
            headers: {
              "Content-Type": "application/json"
            }
          }).then(() => {
            alert("가입 완료");
            this.props.history.push("/");
          });
        }
      });
    }
  };

  checkUniqueId = () => {
    let username = this.props.form.getFieldValue("id");
    let body = { username: username };
    fetch(`${API_HOST_URL}/users/checkId`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.isName) {
          alert("이미 사용 중인 아이디입니다.");
          this.setState({ isIdUnique: false });
        } else if (username.length && !res.isName) {
          alert("가입 가능한 아이디입니다.");
          this.setState({ isIdUnique: true });
        }
      });
  };

  checkUniqueEmail = () => {
    let email = this.props.form.getFieldValue("email");
    let body = { email: email };
    fetch(`${API_HOST_URL}/users/findId`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.username) {
          alert("이미 사용 중인 이메일입니다.");
          this.setState({ isEmailUnique: false });
        } else if (email.length && !res.username) {
          alert("가입 가능한 이메일입니다.");
          this.setState({ isEmailUnique: true });
        }
      });
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("비밀번호가 일치하지 않습니다.");
      this.setState({
        pwCheck: false
      });
    } else {
      callback();
      this.setState({
        pwCheck: true
      });
    }
  };
  setImageUrl = imageUrl => {
    this.setState({ imageUrl: imageUrl });
  };
  render() {
    const form = this.props.form;
    const style = { margin: "3px 3px 3px 3px" };
    return (
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          width: "100%",
          transform: "translate(-50%, -30%)",
          textAlign: "center"
        }}
      >
        <h3>회원가입</h3>
        <UploadProfile
          currentUser={this.props.form.getFieldValue("id")}
          imageUrl={this.state.imageUrl}
          setImageUrl={this.setImageUrl}
        />
        <Form className="signUp-form" onSubmit={this.handleClickConfirm}>
          {/* <Form.Item>
          </Form.Item> */}
          {/* <Form.Item></Form.Item> */}
          <Form.Item>
            {form.getFieldDecorator("id", {
              rules: [{ required: true, message: "아이디를 입력해 주세요." }]
            })(
              <Input
                compact="true"
                style={{ ...style, width: "35%" }}
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="ID"
                onChange={() => {
                  this.setState({ isIdUnique: false });
                }}
              />
            )}
            <Button onClick={this.checkUniqueId}>중복체크</Button>
            <div style={style} id="inputIdCheck"></div>
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "비밀번호를 입력해 주세요."
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(
              <Input.Password
                style={{ ...style, width: "50%" }}
                prefix={
                  <Icon type="key" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "비밀번호를 확인해 주세요."
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(
              <Input.Password
                style={{ ...style, width: "50%" }}
                prefix={
                  <Icon type="key" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Password"
              />
            )}
            <div style={style} id="confirmMessage"></div>
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator("email", {
              rules: [
                {
                  required: true,
                  message: "이메일을 입력해 주세요."
                },
                {
                  type: "email",
                  message: "올바른 이메일을 입력해 주세요."
                }
              ]
            })(
              <Input
                style={{ width: "50%" }}
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="email"
                onChange={() => {
                  this.setState({ isEmailUnique: false });
                }}
              />
            )}
            <Button onClick={this.checkUniqueEmail}>중복체크</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" style={style} htmlType="submit">
              완료
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedSignUp = Form.create({ name: "signUp" })(SignUp);

export default WrappedSignUp;
