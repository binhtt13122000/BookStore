import MaterialTable from 'material-table';
import * as React from 'react';
import { connect } from 'react-redux';
import * as OrderStore from '../../store/Orders';
import * as AuthenticateStore from '../../store/Authentication';
import { ApplicationState } from '../../store';
import { Divider, Grid, Paper } from '@material-ui/core';
type Column = { title: string; field: string; type?: any; lookup?: any, editable?: any, align?: any }

const columnOfTablesAdmin: Column[] = [
    { title: "Thời gian giao dịch", field: "createTime", type: "datetime" },
    { title: "Tổng số tiền", field: "total", align: "right" },
    { title: "Người mua", field: "user.name" },
    { title: "Số điện thoại", field: "phoneNumber" },
    { title: "Địa chỉ", field: "address" }
]

const columnOfTablesUser: Column[] = [
    { title: "Thời gian giao dịch", field: "createTime", type: "datetime" },
    { title: "Tổng số tiền", field: "total", align: "right" },
]

type OrderProps = OrderStore.OrderState & typeof OrderStore.actionCreators & AuthenticateStore.AuthenticateState;

const HistoryPage = (props: OrderProps) => {
    React.useEffect(() => {
        if (props.authenticate.roleId == 1) {
            props.requestOrdersOfUser(props.authenticate.id);
        } else {
            props.requestOrders();
        }
    }, [])
    return <MaterialTable
        style={{ 'width': '100%' }}
        isLoading={props.isLoading}
        title="Lịch sử giao dịch"
        columns={props.authenticate.roleId == 1 ? columnOfTablesUser : columnOfTablesAdmin}
        data={props.orders}
        detailPanel={(rowData: any) => {
            return (
                <React.Fragment>
                    <Paper elevation={3} style={{'boxSizing': "border-box", 'padding': '10px'}}>
                <Grid container spacing={1}>
                    <Grid item xs={4}>Tên sản phẩm</Grid>
                    <Grid item xs={4} style={{ 'textAlign': 'right' }}>Số lượng</Grid>
                    <Grid item xs={4} style={{ 'textAlign': 'right' }}>Thành tiền</Grid>
                        </Grid>
                        <Divider style={{ 'marginTop': '10px', 'marginBottom': '10px' }} />
                    {rowData.orderDetails.map((cartDetail: any) => {
                    return <Grid container spacing={1} key={cartDetail.id}>
                        <Grid item xs={4}>{cartDetail.book && cartDetail.book.name}</Grid>
                        <Grid item xs={4} style={{ 'textAlign': 'right' }}>{cartDetail.quantity}</Grid>
                        <Grid item xs={4} style={{ 'textAlign': 'right' }}>{cartDetail.quantity * (cartDetail.book && cartDetail.book.price)}</Grid>
                    </Grid>
                })
            }
                    <Divider style={{ 'marginTop': '10px', 'marginBottom': '10px' }} />
                <Grid container>
                    <Grid item xs={6}>Tổng số tiền:</Grid>
                        <Grid item xs={6} style={{ 'textAlign': 'right' }}>{rowData.orderDetails.map((cartDetail: any) => cartDetail.quantity * (cartDetail.book && cartDetail.book.price)).reduce((a: number, b: number) => {
                        return a + b;
                    }, 0)}</Grid>
                        </Grid>
                        </Paper>
                    </React.Fragment>
            )
        }}
    />
}

export default connect(
    (state: ApplicationState) => {
        return { ...state.orders, ...state.authenticate }
    },
    OrderStore.actionCreators
)(HistoryPage as any);