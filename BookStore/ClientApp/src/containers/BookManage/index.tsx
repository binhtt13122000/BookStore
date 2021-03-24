import * as React from 'react';
import MaterialTable from 'material-table'
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as BookStore from '../../store/Books';

type Column = { title: string; field: string; type?: any; lookup?: any, editable?: any }
type BookProps = BookStore.BookState & typeof BookStore.actionCreators
const BookManage = (props: BookProps) => {

    const columnsOfTable: Column[] = [
        { title: 'STT', field: 'id', editable: 'never' },
        { title: 'Tên sách', field: 'name' },
        { title: 'Tác giả', field: 'author' },
        { title: 'Giá bán', field: 'price', type: "numeric" },
        { title: 'Số lượng', field: 'quantity', type: "numeric" },
        {
            title: 'Trạng thái',
            field: 'status',
            lookup: { false: 'Đã xóa', true: 'Bình thường' },
            editable: "onUpdate"
        },
    ]

    React.useEffect(() => {
        console.log(1);
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
    (state: ApplicationState) => state.books,
    BookStore.actionCreators
)(BookManage as any);