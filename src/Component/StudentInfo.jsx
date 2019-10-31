import React from 'react';
import { Form, Checkbox, Input } from 'antd';
import '../index.css';

class TeacherInfo extends React.Component {

    render() {
        
        const data = this.props.studentInfo ? this.props.studentInfo : '';
        const getFieldDecorator = this.props.getFieldDecorator;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 12 },
        };

        return (
            <div style={{ display: this.props.display }}>
                <Form {...formItemLayout}>
                    <Form.Item label="所在班级：">
                        {getFieldDecorator('student_grade', {
                            initialValue: data.grade,
                        })(
                            <Input placeholder="请输入班级" />,
                        )}
                    </Form.Item>
                    <Form.Item label="所学课程：">
                        {getFieldDecorator('courses', {
                            initialValue: data.courses,
                        })(
                            <Checkbox.Group style={{ width: '100%' }}>
                                <Checkbox value="语文">语文</Checkbox>
                                <Checkbox value="数学">数学</Checkbox>
                                <Checkbox value="英语">英语</Checkbox>
                            </Checkbox.Group>
                        )}
                    </Form.Item>
                </Form >
            </div>
        )
    }
}

export default TeacherInfo;