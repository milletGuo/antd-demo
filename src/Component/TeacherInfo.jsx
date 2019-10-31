import React from 'react';
import { Form, Radio, Input } from 'antd';
import '../index.css';

class TeacherInfo extends React.Component {

    render() {
        const data = this.props.teacherInfo ? this.props.teacherInfo : '';
        const getFieldDecorator = this.props.getFieldDecorator;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 12 },
        };
        return (
            <div style={{ display: this.props.display }}>
                <Form {...formItemLayout}>
                    <Form.Item label="所教班级：">
                        {getFieldDecorator('teacher_grade', {
                            initialValue: data.grade,
                        })(
                            <Input placeholder="请输入班级" />,
                        )}
                    </Form.Item>
                    <Form.Item label="班主任：">
                        {getFieldDecorator('isMaster', {
                            initialValue: data.isMaster ? data.isMaster : '是',
                        })(
                            <Radio.Group>
                                <Radio value="是">是</Radio>
                                <Radio value="否">否</Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>
                </Form >
            </div>
        )
    }
}

export default TeacherInfo;