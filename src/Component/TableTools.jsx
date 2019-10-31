import React from 'react';
import { Button, Input } from 'antd';
import '../index.css';

class TableTools extends React.Component {

    /**
     * 点击新建按钮打开新建数据窗口
     */
    onHandleCreateClick() {
        this.props.create("create", {});
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

    handlePromiseClick() {
        new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('get', "http://localhost:3000/#", true);
            xhr.send();
            xhr.onload = function () {
                if (this.status === 200) {
                    resolve(xhr.responseText)
                } else {
                    console.log("请求失败！");
                    reject("请求失败！");
                }
            }
        }).then((resolve) => console.log(resolve)).catch((reject) => console.log(reject));
    }

    render() {
        const { Search } = Input;
        return (
            <div style={{ margin: "30px 20px" }}>
                <Button type="primary" onClick={this.onHandleCreateClick.bind(this)}>新建</Button>
                <Search className="qurey" placeholder="请输入姓名" onSearch={this.onHandleQueryClick.bind(this)} />
                <Button type="primary" onClick={this.handlePromiseClick.bind(this)}>Promise请求</Button>
            </div>
        );
    }
}

export default TableTools;