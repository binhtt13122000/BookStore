import MaterialTable from 'material-table';
import * as React from 'react';
import { connect } from 'react-redux';
import * as CartStore from '../../store/Cart';
import * as AuthenticateStore from '../../store/Authentication';
import { ApplicationState } from '../../store';
type Column = { title: string; field: string; type?: any; lookup?: any, editable?: any }
type CartProps = CartStore.CartState & typeof CartStore.actionCreators & AuthenticateStore.AuthenticateState;

const CartPage = (props: CartProps) => {
    const columnsOfTable: Column[] = [
        { title: 'ID', field: 'id', editable: 'never' },
        { title: 'Tên sách', field: 'book.name', editable: 'never' },
        { title: 'Giá bán', field: 'book.price', type: "numeric", editable: 'never' },
        { title: 'Số lượng', field: 'quantity', type: "numeric", editable: "onUpdate" },
    ]
    React.useEffect(() => {
        props.requestCart(props.authenticate.id || -1);
    }, []);

    const handleRowUpdate = (newData: CartStore.CartDetail, oldData: any, resolve: any) => {

    }

    const handleRowDelete = (oldData: CartStore.CartDetail, resolve: any) => {
        props.deleteCart(oldData.id || -1, resolve);
    }

    return <MaterialTable style={{ 'display': "table" }}
        title="Cart Details"
        isLoading={props.isLoading}
        columns={columnsOfTable}
        data={props.cartDetails}
        options={{
            actionsColumnIndex: -1
        }}
        editable={{
            onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                    handleRowUpdate(newData, oldData, resolve);
                }),
            onRowDelete: (oldData) =>
                new Promise((resolve) => {
                    handleRowDelete(oldData, resolve);
                }),
        }}
    />
}

export default connect(
    (state: ApplicationState) => {
        return { ...state.cart, ...state.authenticate }
    },
    CartStore.actionCreators
)(CartPage as any);