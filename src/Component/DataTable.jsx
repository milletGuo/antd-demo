import React from 'react';
import '../index.css';
import TableTools from './TableTools';
import DataList from './DataList';
import EditData2 from './EditData';

class DataTable extends React.Component {

    render() {
        return (
            <div className="tableBox" >
                <TableTools />
                <DataList />
                <EditData2 name="表单" />
            </div>
        );
    }
}

export default DataTable;