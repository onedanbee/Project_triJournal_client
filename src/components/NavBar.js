/* eslint-disable react/prop-types */
import React from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "react-sidebar";
import { Menu, Icon, Button } from "antd";
const API_HOST_URL = process.env.REACT_APP_API_HOST_URL;

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: null
    };
  }
  menuList = [
    { title: "일기쓰기", path: "/page/write" },
    { title: "리스트", path: "/page/list" },
    { title: "검색", path: "/page/search" },
    { title: "즐겨찾기", path: "/page/favorite" },
    { title: "마이페이지", path: "/page/myInfo" }
  ];
  onSetSidebarOpen = () => {
    this.props.setSidebarOpen();
  };

  handleClickLogout = () => {
    alert("로그아웃 되었습니다.");
    fetch(`${API_HOST_URL}/sign/signout`).then(res => {
      res.json();
    });
    this.props.setLogout();
  };

  fetchImgData = () => {
    fetch(`${API_HOST_URL}/users/${this.props.currentUser}`)
      .then(res => res.json())
      .then(data => this.setState({ profilePic: data.userProfilePic }));
  };
  componentDidMount() {
    this.fetchImgData();
  }

  render() {
    return (
      <Sidebar
        sidebar={
          <div
            style={{
              height: "100%",
              background: "#fff"
            }}
          >
            <div
              style={{
                width: "100%",
                height: "10%",
                overflow: "hidden"
              }}
            >
              <h3>
                <p
                  style={{
                    width: "70%",
                    float: "left",
                    display: "inline-block",
                    paddingLeft: "2%",
                    marginTop: "1%"
                  }}
                >
                  <img
                    src={this.state.profilePic}
                    alt="image"
                    height="30px"
                    width="30px"
                  />
                  {`환영합니다, ${this.props.currentUser}님!`}
                </p>
              </h3>
              <Button
                type="primary"
                onClick={this.handleClickLogout}
                style={{ float: "left", marginTop: "2.5%", marginLeft: "5%" }}
              >
                Logout
              </Button>
            </div>
            <div>
              <Menu mode="inline" defaultSelectedKeys={["0"]}>
                {this.menuList.map((menu, i) => {
                  return (
                    <Menu.Item key={i}>
                      <NavLink to={menu.path}>
                        <p>{menu.title}</p>
                      </NavLink>
                    </Menu.Item>
                  );
                })}
              </Menu>
            </div>
          </div>
        }
        open={this.props.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{
          sidebar: {
            zIndex: this.props.sidebarOpen ? "5" : "-1",
            width: "60%"
          }
        }}
      >
        <Icon type="menu" onClick={() => this.onSetSidebarOpen()} />
      </Sidebar>
    );
  }
}

export default NavBar;
