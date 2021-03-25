import * as React from 'react';
import MaterialTable from 'material-table'
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as BookStore from '../../store/Books';
import * as CategoryStore from '../../store/Category';
import { Button } from '@material-ui/core';
import { storage } from '../../Firebase/firebase';
type Column = { title: string; field: string; type?: any; lookup?: any, editable?: any, render?: any, editComponent?: any }
type BookProps = BookStore.BookState & typeof BookStore.actionCreators & CategoryStore.CategoryState
const BookManage = (props: BookProps) => {
    var result: {[unit: string]: string} = {};
    for (var i = 0; i < props.categories.length; i++) {
        result[props.categories[i].id.toString()] = props.categories[i].name;
    }

    const fileInput: React.RefObject<HTMLInputElement> = React.createRef();
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
            editable: "onAdd",
            title: "Hình ảnh",
            field: "image",
            render: (item: BookStore.Book) => <img src={item.image} alt="" height="100" width="100" />,
            editComponent: () => imageAsUrl ? <img src={imageAsUrl} alt="" height="100" width="100" /> : < div >
                <input
                    style={{ display: "none" }}
                    type="file"
                    onChange={onChange}
                    ref={fileInput}
                />
                <Button onClick={e => fileInput.current && fileInput.current.click()} size="small" variant="contained" color="primary">Picture</Button>
            </div>

        }
    ]

    const [imageAsUrl, setImageAsUrl] = React.useState("");

    const onChange = (e: any) => {
        e.preventDefault();
        let file = e.target.files[0];
        if (file !== null && file !== undefined) {
            let selectedFile = e.target.files[0];
            const uploadTask = storage.ref(`/books/${selectedFile.name}`).put(selectedFile);
            uploadTask.on('state_changed',
                (snapShot) => {
                    //takes a snap shot of the process as it is happening
                    console.log(snapShot)
                }, (err) => {
                    //catches the errors
                    console.log(err)
                }, () => {
                    // gets the functions from storage refences the image storage in firebase by the children
                    // gets the download url then sets the image from firebase as the value for the imgUrl key:
                    storage.ref('books').child(selectedFile.name).getDownloadURL()
                        .then(fireBaseUrl => {
                            setImageAsUrl((prevObject: any) => fireBaseUrl);
                            e.preventDefault();
                        })
                })
        }
    }

    React.useEffect(() => {
        props.requestBooks();
    }, []);

    const handleRowAdd = (newData: BookStore.Book, resolve: any) => {
        newData.image = imageAsUrl;
        props.createBooks(newData, resolve);
        setImageAsUrl("");
    }

    const handleRowUpdate = (newData: BookStore.Book, oldData: any, resolve: any) => {
        newData.image = imageAsUrl;
        props.updateBooks(newData, oldData, resolve);
        setImageAsUrl("");
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