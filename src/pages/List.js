/* eslint-disable react/prop-types */
import React from "react";
import Diary from "../components/Diary";
import { Pagination, Empty } from "antd";

class List extends React.Component {
  state = { minValue: 0, maxValue: 10 };
  handleChange = page => {
    this.setState({ minValue: (page - 1) * 10, maxValue: page * 10 });
  };

  render() {
    const { minValue, maxValue } = this.state;
    const diaries = this.props.diaries;
    const loading = this.props.loading;
    const deleteDiary = this.props.deleteDiary;
    const editDiary = this.props.editDiary;
    return (
      <div>
        {!diaries.length && !loading ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>첫 번째 일기를 써보세요!</span>}
          />
        ) : (
          diaries
            .sort((a, b) => b.id - a.id)
            .slice(minValue, maxValue)
            .map((diary, i) => {
              return (
                <Diary
                  diary={diary}
                  loading={loading}
                  key={i}
                  deleteDiary={deleteDiary}
                  editDiary={editDiary}
                />
              );
            })
        )}
        <Pagination
          size="small"
          hideOnSinglePage={true}
          pageSize={10}
          onChange={this.handleChange}
          total={diaries.length}
        ></Pagination>
      </div>
    );
  }
}

export default List;
