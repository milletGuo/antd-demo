import React from 'react';
import '../index.css';
import TableTools from './TableTools';
import DataList from './DataList';
import EditData2 from './EditData';

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLists: [],          // localStorage中的数据
            dataToShow: [],         // 需要在表格中展示的数据
        }
    }

    /**
     * 在组件挂载之后，加载localStorage中的数据
     */
    componentDidMount() {
        // 首次挂载加载localStorage中的数据
        if (localStorage.getItem('data') != null) {
            let tempData = JSON.parse(localStorage.getItem('data'));
            this.setState({ dataLists: tempData, queryResult: tempData, dataToShow: tempData });
            //this.showData(tempData);
        }
    }

    render() {
        return (
            <div className="tableBox" >
                <TableTools />
                <DataList dataToShow={this.state.dataToShow} />
                <EditData2 />
            </div>
        );
    }
}

export default DataTable;