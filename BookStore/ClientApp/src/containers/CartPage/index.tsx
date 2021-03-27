import MaterialTable from 'material-table';
import * as React from 'react';
import { connect } from 'react-redux';
import * as CartStore from '../../store/Cart';
import * as AuthenticateStore from '../../store/Authentication';
import { ApplicationState } from '../../store';
import { Promise } from 'es6-promise'
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';

type Column = { title: string; field: string; type?: any; lookup?: any, editable?: any }
type CartProps = CartStore.CartState & typeof CartStore.actionCreators & AuthenticateStore.AuthenticateState;
const useStyles = makeStyles((theme) => ({
    warming: {
        display: "flex",
        alignItems: "center",
        color: "#f50057",
    },
    warmingIcon: {
        fontSize: "16px",
        marginBottom: "4px",
        marginRight: "4px",
    },
}));

const CartPage = (props: CartProps) => {
    const { handleSubmit, clearErrors, errors, setError, register } = useForm();
    const classes = useStyles();
    const columnsOfTable: Column[] = [
        { title: 'Tên sách', field: 'book.name', editable: 'never' },
        { title: 'Giá bán', field: 'book.price', type: "numeric", editable: 'never' },
        { title: 'Số lượng', field: 'quantity', type: "numeric", editable: "onUpdate" },
    ]

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        props.requestCart(props.authenticate.id || -1);
    }, []);

    const handleRowUpdate = (newData: CartStore.CartDetail, oldData: any, resolve: any) => {
        props.updateCart(newData, newData.id || -1, oldData.tableData.id, newData.quantity || -1, resolve);
    }

    const handleRowRemove = (oldData: CartStore.CartDetail, resolve: any) => {
        props.deleteCart(oldData.id || -1, resolve);
    }

    const openConfirmModal = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const submitHandler = (data: any) => {
        clearErrors();
        setLoading(true);
        axios.post(`api/orders/users/${props.authenticate.id}/books/productcarts`, {
            PhoneNumber: data.phone,
            Address: data.address
        })
            .then(res => {
                if (res.status === 200) {
                    console.log("Successful!");
                    setLoading(false);
                    setOpen(false);
                    props.deleteAll();
                }
            })
            .catch(ex => {
                setLoading(false);
                console.log(ex.response);
                setError("ERROR", {
                    type: "manual",
                    message: "Thanh toán thất bại!"
                });
            })
    }

    return <React.Fragment>
        <Grid spacing={2} container>
            <Grid item xs={ 12}>
                <Container style={{ 'width': '100%' }}>
                    <Button disabled={props.cartDetails.length < 1} onClick={openConfirmModal} variant="contained" color="primary" style={{ 'float': 'right' }}>Thanh Toán</Button>
                </Container>
            </Grid>
            <Grid item xs={12}>
        <Container style={{ 'width': '100%' }}>
            <MaterialTable style={{ 'width': "100%" }}
                title="Giỏ Hàng"
                isLoading={props.isLoading}
                columns={columnsOfTable}
                data={props.cartDetails}
                options={{
                    actionsColumnIndex: -1,
                    paging: false
                }}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            handleRowUpdate(newData, oldData, resolve);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            handleRowRemove(oldData, resolve);
                        }),
                }}
            />
                </Container>
                </Grid>
        </Grid>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <form onClick={handleSubmit(submitHandler)}>
            <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
            <DialogContent>
                    Tên khách hàng: {props.authenticate.name}
                    <Divider style={{ 'marginTop': '10px', 'marginBottom': '10px' }} />
                    <Grid container spacing={ 1 }>
                        <Grid item xs={4}>Tên sản phẩm</Grid>
                        <Grid item xs={4} style={{'textAlign': 'right'}}>Số lượng</Grid>
                        <Grid item xs={4} style={{ 'textAlign': 'right' }}>Thành tiền</Grid>
                    </Grid>
                    {props.cartDetails.map((cartDetail: any) => {
                        return <Grid container spacing={1} key={cartDetail.id}>
                            <Grid item xs={4}>{cartDetail.book && cartDetail.book.name}</Grid>
                            <Grid item xs={4} style={{ 'textAlign': 'right' }}>{cartDetail.quantity}</Grid>
                            <Grid item xs={4} style={{ 'textAlign': 'right' }}>{cartDetail.quantity * (cartDetail.book && cartDetail.book.price)}</Grid>
                        </Grid>
                    })}
                    <Divider style={{ 'marginTop': '10px', 'marginBottom': '10px' }} />
                <Grid container>
                    <Grid item xs={6}>Tổng số tiền:</Grid>
                    <Grid item xs={6} style={{ 'textAlign': 'right' }}>{props.cartDetails.map((cartDetail: any) => cartDetail.quantity * (cartDetail.book && cartDetail.book.price)).reduce((a: number, b: number) => {
                        return a + b;
                    }, 0)}</Grid>
                </Grid>
                <DialogContentText>
                    Vui lòng nhập số điện thoại liên hệ và địa chỉ để hỗ trợ vận chuyển!
                </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        onFocus={() => clearErrors("ERROR")}
                        name="address"
                        label="Địa chỉ"
                        type="text"
                        fullWidth
                        error={errors["address"] !== null && errors["address"] !== undefined}
                        inputRef={register({ required: "Địa chỉ được yêu cầu!", maxLength: {value: 50, message: "Tối đa 50 kí tự!"} })}
                    />
                    {errors["address"] &&
                        <div className={classes.warming}>
                            <WarningIcon className={classes.warmingIcon} />
                            <span>{errors["address"].message}</span>
                        </div>
                    }
                    <TextField
                        margin="dense"
                        id="phone"
                        onFocus={() => clearErrors("ERROR")}
                        name="phone"
                        label="Số điện thoại"
                        type="tel"
                        fullWidth
                        error={errors["phone"] !== null && errors["phone"] !== undefined}
                        inputRef={register({
                            required: "Số điện thoại được yêu cầu!", pattern: {
                                value: /((09|03|07|08|05)+([0-9]{8})\b)/g,
                                message: "Số điện thoại không hợp lệ"
                            }
                        })}
                    />
                    {errors["phone"] &&
                        <div className={classes.warming}>
                            <WarningIcon className={classes.warmingIcon} />
                            <span>{errors["phone"].message}</span>
                        </div>
                    }
                    {errors["ERROR"] &&
                        <div className={classes.warming}>
                            <WarningIcon className={classes.warmingIcon} />
                            <span>{errors["ERROR"].message}</span>
                        </div>
                    }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Thoát
          </Button>
                <Button type="submit" color="primary">
                    Thanh Toán
          </Button>
                </DialogActions>
            </form>
        </Dialog>
        </React.Fragment>
}

export default connect(
    (state: ApplicationState) => {
        return { ...state.cart, ...state.authenticate }
    },
    CartStore.actionCreators
)(CartPage as any);