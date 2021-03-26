import { Grid, Typography } from '@material-ui/core';
import './style.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as BookStore from '../../store/Books';
import * as CartStore from '../../store/Cart';
import * as AuthenticateStore from '../../store/Authentication';
import { RouteComponentProps } from 'react-router';

const creator = { ...BookStore.actionCreators, ...CartStore.actionCreators };
type BookProps = BookStore.BookState & typeof creator & RouteComponentProps & AuthenticateStore.AuthenticateState;
const BookDetail = (props: BookProps) => {
    React.useEffect(() => {
        const id = props.location.pathname.substring(props.location.pathname.lastIndexOf("/") + 1);
        props.requestBook(parseInt(id))
    }, []);

    if (props.isLoading) {
        return <Grid container justify="center" style={{ 'marginTop': '20vh' }}>
            <Typography>Loading...</Typography>
        </Grid>
    }

    const addToCart = () => {
        props.addToCart({
            userId: props.authenticate.id || -1,
            bookId: parseInt(props.location.pathname.substring(props.location.pathname.lastIndexOf("/") + 1)),
            quantity: 1
        })
    }
    return <main className="container">
        <div className="left-column">
            <img className="active" src={props.books[0] && props.books[0].image} alt="Book" width="80%" />
        </div>
        <div className="right-column">
            <div className="product-description">
                <span>{props.books[0].category && props.books[0].category.name}</span>
                <h1>{props.books[0] && props.books[0].name}</h1>
                <h2>{props.books[0] && props.books[0].author}</h2>
                <p>Sách độc quyền chỉ được bán tại BookStore với nhiều ưu đãi hấp dẫn!</p>
                <p>Số lượng: {props.books[0] && props.books[0].quantity}</p>
            </div>
            <div className="product-price">
                <span>{props.books[0] && props.books[0].price} VNĐ</span>
                <button onClick={ addToCart } className="cart-btn">Thêm vào giỏ hàng</button>
            </div>
        </div>
    </main>
}

export default connect(
    (state: ApplicationState) => {
        return { ...state.books, ...state.authenticate }
    },
    { ...BookStore.actionCreators, ...CartStore.actionCreators }
)(BookDetail as any)

