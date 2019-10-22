/* eslint-disable react/prop-types */
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Layout } from "antd";
import WrappedWrite from "./Write";
import NavBar from "../components/NavBar";
import List from "./List";
import MyInfo from "./MyInfo";
const API_HOST_URL = process.env.REACT_APP_API_HOST_URL;

class Page extends React.Component {
  state = {
    loading: true,
    sidebarOpen: false,
    diaries: [{ init: true }]
  };
  fetchDiary = () => {
    return fetch(`${API_HOST_URL}/posts/${this.props.currentUser}`).then(res =>
      res.json()
    );
  };
  setSidebarOpen = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  };
  componentDidMount = () => {
    if (this.props.currentUser.length) {
      this.fetchDiary().then(diaries =>
        this.setState({ diaries: diaries, loading: false })
      );
    }
  };
  postDiary = async diary => {
    await fetch(`${API_HOST_URL}/posts/${this.props.currentUser}`, {
      method: "POST",
      body: JSON.stringify(diary),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let loadNewDiary = await this.fetchDiary();
    this.setState({
      diaries: this.state.diaries.concat(loadNewDiary[loadNewDiary.length - 1])
    });
  };
  deleteDiary = async postId => {
    await fetch(`${API_HOST_URL}/posts/${this.props.currentUser}/${postId}`, {
      method: "DELETE"
    });
    let loadNewDiary = await this.fetchDiary();
    this.setState({ diaries: loadNewDiary });
  };
  editDiary = async (body, postId) => {
    await fetch(`${API_HOST_URL}/posts/${this.props.currentUser}/${postId}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json());

    let loadNewDiary = await this.fetchDiary();
    this.setState({ diaries: loadNewDiary });
  };
  setLogout = () => {
    this.props.setLogout("");
  };
  render() {
    const { Header, Content } = Layout;
    return this.props.currentUser === "" ? (
      <Redirect to="/" />
    ) : (
      <Router>
        <Header style={{ backgroundColor: "#d3adf7" }}>
          <NavBar
            currentUser={this.props.currentUser}
            setLogout={this.setLogout}
            setSidebarOpen={this.setSidebarOpen}
            sidebarOpen={this.state.sidebarOpen}
          />
          <span>triJournal</span>
        </Header>
        <Content style={{ padding: "30px 50px 50px 50px" }}>
          <Switch>
            <Route
              path="/page/write"
              component={() => (
                <WrappedWrite
                  currentUser={this.props.currentUser}
                  diaries={this.state.diaries}
                  loading={this.state.loading}
                  postDiary={this.postDiary}
                  deleteDiary={this.deleteDiary}
                  editDiary={this.editDiary}
                />
              )}
            />
            <Route
              path="/page/list"
              component={() => (
                <List
                  diaries={this.state.diaries}
                  loading={this.state.loading}
                  deleteDiary={this.deleteDiary}
                  editDiary={this.editDiary}
                />
              )}
            />
            <Route path="/page/myInfo" component={MyInfo} />
          </Switch>
        </Content>
      </Router>
    );
  }
}

export default Page;
