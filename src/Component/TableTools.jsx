import React from 'react';
import { Button, Input } from 'antd';
import '../index.css';

class TableTools extends React.Component {

    /**
     * 点击新建按钮打开新建数据窗口
     */
    onHandleCreateClick() {
        this.props.create("create", { name: '', sex: '男', age: '', role: '教师', grade: '', isMaster: '是', courses: '', });
    }

    /**
     * 根据姓名进行查询
     * @param {string} name 姓名
     */
    onHandleQueryClick(name) {
        const dataLists = this.props.data.slice();
        let queryResult = dataLists.filter((item) => {
            return (item.name.indexOf(name) !== -1);
        });
        this.props.query("query", queryResult);
    }

    render() {
        const { Search } = Input;
        return (
            <div style={{ margin: "30px 20px" }}>
                <Button type="primary" onClick={this.onHandleCreateClick.bind(this)}>新建</Button>
                <Search className="qurey" placeholder="请输入姓名" onSearch={this.onHandleQueryClick.bind(this)} />
                <Button type="primary">Promise请求</Button>
            </div>
        );
    }
}

export default TableTools;