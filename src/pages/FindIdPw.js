import React from "react";
import { Button } from "antd";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import WrappedFindPw from "../components/FindPw";
import WrappedFindId from "../components/FindId";

// eslint-disable-next-line react/prop-types
const FindIdPw = ({ history }) => {
  return (
    <Router>
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center"
        }}
      >
        <h3>아이디/비밀번호 찾기</h3>
        <Link to="/find/id">
          <Button>아이디 찾기</Button>
        </Link>
        <Link to="/find/password">
          <Button>비밀번호 찾기</Button>
        </Link>
        <Button
          onClick={() => {
            // eslint-disable-next-line react/prop-types
            history.push("/");
          }}
        >
          뒤로 가기
        </Button>
      </div>
      <Switch>
        <Route path="/find/id" component={WrappedFindId} />
        <Route path="/find/password" component={WrappedFindPw} />
      </Switch>
    </Router>
  );
};

export default FindIdPw;
