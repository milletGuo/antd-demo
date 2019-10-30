import React from 'react';
import { Button, Table, ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import '../index.css';

class DataList extends React.Component {

    /**
     * 处理删除数据事件
     * @param {number} dataIndex 数据索引
     */
    onHandleDelClick(dataIndex) {
        this.props.delData(dataIndex);
    }

    /**
     * 处理编辑数据事件
     * @param {number} dataIndex 数据索引
     */
    onHandleEditClick(text, record, index, dataIndex) {
        // console.log(text);
        // console.log(record);
        // console.log(index + "***" + dataIndex);
        let data = [];
        data = this.props.dataToShow.filter((item) => { return dataIndex === item.index });
        this.props.editData("edit", data[0]);
    }

    render() {
        const { Column } = Table;
        const data = this.props.dataToShow.slice();

        const filterCourse = {
            filters: [
                {
                    text: '语文',
                    value: '语文',
                },
                {
                    text: '数学',
                    value: '数学',
                },
                {
                    text: '英语',
                    value: '英语',
                },
            ],
            onFilter: (value, record) => record.courses.indexOf(value) !== -1,
        }
        const filterRole = {
            filters: [
                {
                    text: '教师',
                    value: '教师',
                },
                {
                    text: '学生',
                    value: '学生',
                },
            ],

            onFilter: (value, record) => record.role.indexOf(value) !== -1,
        }
        
        const pagination = {
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
            showTotal: function (total) {
                return "共" + data.length + "条  " + "筛选出" + total + "条";
            },
        };
        return (
            <ConfigProvider locale={zh_CN} >
                <div className="tableContent">
                    <Table dataSource={data} bordered pagination={pagination}>
                        <Column title="姓名" dataIndex="name" key="name" align="center" />
                        <Column title="性别" dataIndex="sex" key="sex" align="center" />
                        <Column title="年龄" dataIndex="age" key="age" align="center" sorter={(a, b) => a.age - b.age} />
                        <Column title="班级" dataIndex="grade" key="grade" align="center" />
                        <Column title="是否为班主任" dataIndex="isMaster" key="isMaster" align="center" />
                        <Column title="课程" dataIndex="courses" key="courses" align="center" filters={filterCourse.filters} onFilter={filterCourse.onFilter} />
                        <Column title="角色" dataIndex="role" key="role" align="center" filters={filterRole.filters} onFilter={filterRole.onFilter} />
                        <Column
                            title="操作"
                            key="action"
                            align="center"
                            render={(text, record, index) => (
                                <div className="operation">
                                    <Button key="edit" onClick={this.onHandleEditClick.bind(this, text, record, index, record.index)} disabled={this.props.disabled}>编辑</Button>
                                    <Button key="delete" onClick={this.onHandleDelClick.bind(this, record.index)} disabled={this.props.disabled}>删除</Button>
                                </div>
                            )}
                        />
                    </Table>
                </div>
            </ConfigProvider>
        );
    }
}

export default DataList;