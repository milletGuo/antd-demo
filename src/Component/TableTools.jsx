import React from 'react';
import Button from 'antd/es/button';
import { Input } from 'antd';
import '../index.css';

class TableTools extends React.Component {

    render() {
        const { Search } = Input;
        return (
            <div style={{ margin: "30px 20px" }}>
                <Button type="primary">新建</Button>
                <Search className="qurey" placeholder="请输入姓名"  />
                <Button type="primary">Promise请求</Button>
            </div>
        );
    }
}

export default TableTools;