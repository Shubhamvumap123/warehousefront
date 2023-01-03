import React, { useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'

const columns = [
  { field: 'warehouse_id', headerName: 'warehouse_id',width: 300 },
  { field: 'subwarehouse_id', headerName: 'subwarehouse_id',width: 300 },
  { field: 'warehouse_name', headerName: 'warehouse_name', width: 300 },
  { field: 'subwarehouse_name', headerName: 'subwarehouse_name', width: 600 }
]

const DataTable = () => {

  const [tableData, setTableData] = useState([])

  const [rows, setRows] = useState(tableData);
  const [deletedRows, setDeletedRows] = useState([]);

  useEffect(() => {
    fetch("https://warehouseback-bp8u.onrender.com/warehouse")
      .then((data) => data.json())
      .then((data) => setTableData(data.Warehouse))
.catch((err)=>console.log(err))
  }, [])

  console.log("tableData",tableData);

  return (
    <div style={{ height: 700, width: '100%' }}>
      <h1>Warehouse Data</h1>
      <DataGrid
        rows={tableData}
        columns={columns}
        getRowId={(row) =>  row._id }
        pageSize={12}
        checkboxSelection
        onSelectionModelChange={({ selectionModel }) => {
          {console.log(selectionModel)}
          const rowIds = selectionModel.map(rowId => parseInt(String(rowId), 10));
          const rowsToDelete = tableData.filter(row => rowIds.includes(row.id));
          setDeletedRows(rowsToDelete);
          console.log(deletedRows);
        }}
      />
    </div>
  )
}

export default DataTable
