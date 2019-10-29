import React from 'react';
import { Modal, Form, Select, Button, Input } from 'antd';
import '../index.css';

class EditData extends React.Component {

    state = { visible: true };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { Option } = Select;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 },
        };
        return (
            <div>
                <Modal title="编辑数据" visible={false} width={540} onCancel={this.handleCancel} footer={[<Button key="submit" onClick={this.handleOk}>确定</Button>]}>
                    <Form {...formItemLayout}>
                        <Form.Item label="姓名：">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入正确的姓名!' }],
                                // initialValue: this.props.name,
                            })(
                                <Input placeholder="请输入姓名" />,
                            )}
                        </Form.Item>
                        <Form.Item label="性别：">
                            {getFieldDecorator('sex')(
                                <Select>
                                    <Option value="男">男</Option>
                                    <Option value="女">女</Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="年龄：">
                            {getFieldDecorator('age', {
                                rules: [{ required: true, message: '请输入正确的年龄!' }],
                                // initialValue: this.props.name,
                            })(
                                <Input placeholder="请输入年龄" />,
                            )}
                        </Form.Item>
                        <Form.Item label="角色：">
                            {getFieldDecorator('role')(
                                <Select   >
                                    <Option value="教师">教师</Option>
                                    <Option value="学生">学生</Option>
                                </Select >,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

const EditData2 = Form.create({ name: 'horizontal_login' })(EditData);

export default EditData2;