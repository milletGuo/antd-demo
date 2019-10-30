import React from 'react';
import { Modal, Form, Select, Button, Input } from 'antd';
import TeacherInfo from './TeacherInfo';
import StudentInfo from './StudentInfo';
import '../index.css';

class EditData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teacherDiv: '',
            studentDiv: '',
        }
    }

    /**
     * 切换教师/学生组件
     * @param {string} role 角色
     */
    handleChange(role) {
        if (role === "教师") {
            this.setState({
                teacherDiv: 'block',
                studentDiv: 'none',
            });
        } else {
            this.setState({
                teacherDiv: 'none',
                studentDiv: 'block',
            });
        }
    }

    /**
     * 处理表单提交事件
     */
    handleSubmit() {
        let dataLists = this.props.data.slice();
        let data = {};
        // 获取表单值并根据角色格式化
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.role === "教师") {
                    values.grade = values.teacher_grade;
                    values.courses = '';
                    delete values["teacher_grade"];
                    delete values["student_grade"];
                } else {
                    values.isMaster = '';
                    values.grade = values.student_grade;
                    values.courses = values.courses.join(' ');
                    delete values["teacher_grade"];
                    delete values["student_grade"];
                }
                data = values;
            }
        });
        // 根据传入参数的状态更新数据
        if (this.props.status === "create") {
            let index = this.findMaxIndex(dataLists);
            index++;
            data.index = index;
            data.key = index;
            dataLists.push(data);
            this.props.submit("create", dataLists);
        } else {
            let dataToEdit = this.props.dataToEdit;
            dataLists = dataLists.map((item) => {
                if (dataToEdit.index === item.index) {
                    data.index = item.index;
                    data.key = item.index;
                    item = data;
                }
                return item;
            });
            this.props.submit("edit", dataLists);
        }
        this.props.form.resetFields();
        this.props.close();
    }

    /**
     * 找出数据索引的最大值
     * @param {Object []} data 需要查找的数据
     * @returns {Number} 传入数据的最大索引
     */
    findMaxIndex(data) {
        let dataLists = [];
        data.forEach(function (item) {
            dataLists.push(item.index);
        });
        if (dataLists.length === 0) {
            return 0;
        } else {
            return Math.max.apply(null, dataLists);
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { Option } = Select;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 12 },
        };

        // 对传递进来的参数进行格式化
        let data = this.props.dataToEdit;
        switch (data.role) {
            case "教师":
                data = {
                    name: data.name, sex: data.sex, age: data.age, role: data.role,
                    teacherDiv: this.state.teacherDiv ? this.state.teacherDiv : 'block',
                    studentDiv: this.state.studentDiv ? this.state.studentDiv : 'none',
                    teacherInfo: { grade: data.grade ? data.grade : "", isMaster: data.isMaster ? data.isMaster : "是", },
                    studentInfo: { grade: "", courses: [], }
                };
                break;
            case "学生":
                data = {
                    name: data.name, sex: data.sex, age: data.age, role: data.role,
                    teacherDiv: this.state.teacherDiv ? this.state.teacherDiv : 'none',
                    studentDiv: this.state.studentDiv ? this.state.studentDiv : 'block',
                    teacherInfo: { grade: "", isMaster: "是", },
                    studentInfo: { grade: data.grade ? data.grade : "", courses: data.courses ? data.courses.split(' ') : [], }
                };
                break;
            default:
        }
        return (
            <div>
                <Modal title="编辑数据" visible={this.props.visible} onCancel={this.props.close} width={540} footer={[<Button key="submit" onClick={this.handleSubmit.bind(this)}>确定</Button>]}>
                    <Form {...formItemLayout}>
                        <Form.Item label="姓名：">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入正确的姓名!' }],
                                initialValue: data.name,
                            })(
                                <Input placeholder="请输入姓名" />,
                            )}
                        </Form.Item>
                        <Form.Item label="性别：">
                            {getFieldDecorator('sex', { initialValue: data.sex, })(
                                <Select>
                                    <Option value="男">男</Option>
                                    <Option value="女">女</Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="年龄：">
                            {getFieldDecorator('age', {
                                rules: [{ required: true, message: '请输入正确的年龄!' }],
                                initialValue: data.age,
                            })(
                                <Input placeholder="请输入年龄" />,
                            )}
                        </Form.Item>
                        <Form.Item label="角色：">
                            {getFieldDecorator('role', { initialValue: data.role, })(
                                <Select onChange={this.handleChange.bind(this)}>
                                    <Option value="教师">教师</Option>
                                    <Option value="学生">学生</Option>
                                </Select >,
                            )}
                        </Form.Item>
                    </Form>
                    <TeacherInfo display={data.teacherDiv} teacherInfo={data.teacherInfo} getFieldDecorator={getFieldDecorator} />
                    <StudentInfo display={data.studentDiv} studentInfo={data.studentInfo} getFieldDecorator={getFieldDecorator} />
                </Modal>
            </div>
        );
    }
}

const EditDataForm = Form.create({ name: 'edit_data' })(EditData);

export default EditDataForm;