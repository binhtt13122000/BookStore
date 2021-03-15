import * as React from 'react';
import MaterialTable from 'material-table'
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';


const columns = [
    { title: 'STT', field: 'id', editable: 'never' },
    { title: 'Tên sách', field: 'name' },
    { title: 'Tác giả', field: 'author' },
    { title: 'Giá bán', field: 'price', type: 'numeric' },
    { title: 'Số lượng', field: 'quantity', type: 'numeric' },
    {
        title: 'Trạng thái',
        field: 'status',
        lookup: { false: 'Đã xóa', true: 'Bình thường' },
        editable: 'onUpdate'
    },
]


 function BookManage() {
    const [data, setData] = React.useState([]);
        return (
            <Container>
                cc
            </Container>
        )
}

export default connect()(BookManage);
