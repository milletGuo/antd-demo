import React from 'react';
import { Table } from 'antd';
import Button from 'antd/es/button';
import '../index.css';

class DataList extends React.Component {

    render() {
        const { Column } = Table;
        const data = this.props.dataToShow.slice();
        return (
            <div className="tableContent">
                <Table dataSource={data} bordered>
                    <Column title="姓名" dataIndex="name" key="name" align="center" />
                    <Column title="性别" dataIndex="sex" key="sex" align="center" />
                    <Column title="年龄" dataIndex="age" key="age" align="center" />
                    <Column title="班级" dataIndex="grade" key="grade" align="center" />
                    <Column title="是否为班主任" dataIndex="isMaster" key="isMaster" align="center" />
                    <Column title="课程" dataIndex="courses" key="courses" align="center" />
                    <Column title="角色" dataIndex="role" key="role" align="center" />
                    <Column
                        title="操作"
                        key="action"
                        align="center"
                        render={(text, record) => (
                            <div className="operation">
                                <Button key="edit">编辑</Button>
                                <Button key="delete">删除</Button>
                            </div>
                        )}
                    />
                </Table>
            </div>
        );
    }
}

export default DataList;