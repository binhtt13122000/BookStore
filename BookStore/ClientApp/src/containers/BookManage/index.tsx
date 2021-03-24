import * as React from 'react';
import MaterialTable from 'material-table'
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as BookStore from '../../store/Books';
import * as CategoryStore from '../../store/Category';
import { Button } from '@material-ui/core';
type Column = { title: string; field: string; type?: any; lookup?: any, editable?: any, render?: any }
type BookProps = BookStore.BookState & typeof BookStore.actionCreators & CategoryStore.CategoryState
const BookManage = (props: BookProps) => {
    var result: {[unit: string]: string} = {};
    for (var i = 0; i < props.categories.length; i++) {
        result[props.categories[i].id.toString()] = props.categories[i].name;
    }
    const columnsOfTable: Column[] = [
        { title: 'STT', field: 'id', editable: 'never' },
        { title: 'Tên sách', field: 'name' },
        { title: 'Tác giả', field: 'author' },
        { title: 'Giá bán', field: 'price', type: "numeric" },
        { title: 'Số lượng', field: 'quantity', type: "numeric" },
        {
            title: 'Loại sách',
            field: 'categoryId',
            lookup: { ...result },
        },
        {
            title: 'Trạng thái',
            field: 'status',
            lookup: { false: 'Đã xóa', true: 'Bình thường' },
            editable: "onUpdate"
        },
        {
            title: "Hình ảnh",
            field: "image",
            render: (rowData: BookStore.Book) => rowData.image || <Button size="small" variant="contained" color="primary">Add Image</Button>
        }
    ]

    React.useEffect(() => {
        props.requestBooks();
    }, []);

    const handleRowAdd = (newData: BookStore.Book, resolve: any) => {
        props.createBooks(newData, resolve);
    }

    const handleRowUpdate = (newData: BookStore.Book, oldData: any, resolve: any) => {
        props.updateBooks(newData, oldData, resolve);
    }

    const handleRowDelete = (oldData: BookStore.Book, resolve: any) => {
        let newData = { ...oldData };
        newData.status = false;
        props.updateBooks(newData, oldData, resolve);
    }
    return (
        <Container>
            <MaterialTable
                isLoading={props.isLoading}
                title="Book Management"
                columns={columnsOfTable}
                data={props.books}
                options={{
                    actionsColumnIndex: -1
                }}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            handleRowUpdate(newData, oldData, resolve);
                        }),
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            handleRowAdd(newData, resolve)
                        }),
                    onRowDelete: (oldData) => 
                        new Promise((resolve) => {
                            handleRowDelete(oldData, resolve);
                        }),
                }}
            />
        </Container>
    )
}

export default connect(
    (state: ApplicationState) => {
        return { ...state.books, ...state.categories }
    },
    BookStore.actionCreators
)(BookManage as any);