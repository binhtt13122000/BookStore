import React, { useState, useEffect, Fragment } from 'react';
import MaterialTable from 'material-table'
import Container from '@material-ui/core/Container';


const BookManage = () => {
    const [columnsOfTable, setcolumnsOfTable] = useState([
        { title: 'STT', field: 'id' },
        { title: 'Tên sách', field: 'name' },
        { title: 'Tác giả', field: 'author' },
        { title: 'Giá bán', field: 'price' },
        { title: 'Số lượng', field: 'quantity' },
        {
            title: 'Trạng thái',
            field: 'status',
            lookup: { false: 'Đã xóa', true: 'Bình thường' },
        },
    ])


    const [data, setData] = useState([{
        id: 1,
        name: 'binh',
        author: 'a',
        price: 12,
        quantity: 2,
        status: false
    }]);

    const handleRowAdd = (newData, resolve) => {
        console.log(newData)
    }

    const handleRowUpdate = (newData, oldData, resolve) => {
        console.log(newData)
    }
    return (
        <Container>
            <MaterialTable
                title="Book Management"
                columns={columnsOfTable}
                data={data}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            handleRowUpdate(newData, oldData, resolve);
                        }),
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            handleRowAdd(newData, resolve)
                        }),
                }}
            />
        </Container>
    )
}

export default BookManage;