import React from 'react';
import '../index.css';
import TableTools from './TableTools';
import DataList from './DataList';
import EditData from './EditData';

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,          // 是否显示编辑组件
            status: '',              // 编辑组件状态
            dataLists: [],           // localStorage中的数据
            queryResult: [],         // 需要在表格中展示的数据
            dataToEdit: {},          // 需要编辑的数据
        }
    }

    /**
     * 删除一条数据
     * @param {number} index 需要删除的数据索引
     */
    delData(dataIndex) {
        const dataLists = this.state.dataLists.slice();
        dataLists.forEach(function (item, index) {
            if (dataIndex === item.index) {
                dataLists.splice(index, 1);
            }
        })
        this.setState({ dataLists: dataLists, queryResult: dataLists });
    }

    /**
     * 显示EditData组件
     * @param {string} status 组件状态(新建，编辑)
     * @param {json} data  需要新建或编辑的数据
     */
    openDialog(status, data) {
        this.setState({
            visible: true,
            status: status,
            dataToEdit: data,
        });
    }

    /**
     * 隐藏EditData组件
     */
    closeDialog() {
        this.setState({
            visible: false,
            status: "",
            dataToEdit: "",
        });
    }

    /**
     * 更新数据(表单提交后执行)
     * @param {string} status 更新数据时的状态
     * @param {Array<json>} data 需要更新的数据
     */
    updateData(status, data) {
        if (status === "query") {
            this.setState({ queryResult: data });
        } else {
            this.setState({ dataLists: data, queryResult: data });
        }
    }

    /**
     * 在组件挂载之后，加载localStorage中的数据
     */
    componentDidMount() {
        // 首次挂载加载localStorage中的数据
        if (localStorage.getItem('data') != null) {
            let tempData = JSON.parse(localStorage.getItem('data'));
            this.setState({ dataLists: tempData, queryResult: tempData });
        }
    }

    /**
     * 组件更新完成后，将最新的数据存储至localStorage中
     * @param {Object} prevProps 之前的参数
     * @param {Object} prevState 之前的状态
     */
    componentDidUpdate(prevProps, prevState) {
        localStorage.setItem('data', JSON.stringify(this.state.dataLists));
    }

    render() {
        return (
            <div className="tableBox" >
                <TableTools data={this.state.dataLists} create={this.openDialog.bind(this)} query={this.updateData.bind(this)} />
                <DataList dataToShow={this.state.queryResult} editData={this.openDialog.bind(this)} delData={this.delData.bind(this)} />
                <EditData visible={this.state.visible} dataToEdit={this.state.dataToEdit} data={this.state.dataLists} status={this.state.status} close={this.closeDialog.bind(this)} submit={this.updateData.bind(this)} />
            </div>
        );
    }
}

export default DataTable;