import { Grid, Typography } from '@material-ui/core';
import './style.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as BookStore from '../../store/Books';
import { RouteComponentProps } from 'react-router';

type BookProps = BookStore.BookState & typeof BookStore.actionCreators & RouteComponentProps;
const BookDetail = (props: BookProps) => {
    React.useEffect(() => {
        const id = props.location.pathname.substring(props.location.pathname.lastIndexOf("/") + 1);
        props.requestBook(parseInt(id));
    }, []);

    if (props.isLoading) {
        return <Grid container justify="center" style={{ 'marginTop': '20vh' }}>
            <Typography>Loading...</Typography>
        </Grid>
    }
    return <main className="container">
        <div className="left-column">
            <img className="active" src="https://1.bp.blogspot.com/-Yqc7dYMjV4k/WPByXopDvrI/AAAAAAAAIWU/d-z3mInf5YIvjSYK2XCVQi_QBhB-HHM-gCLcB/s320/The%2BObject%2BOriented%2Bthought%2Bprocess.jpeg" alt="Book" width="80%" />
        </div>
        <div className="right-column">
            <div className="product-description">
                <span>Sách Tin Học</span>
                <h1>{props.books[0] && props.books[0].name}</h1>
                <h2>{props.books[0] && props.books[0].author}</h2>
                <p>Sách độc quyền chỉ được bán tại BookStore với nhiều ưu đãi hấp dẫn!</p>
                <p>Số lượng: {props.books[0] && props.books[0].quantity}</p>
            </div>
            <div className="product-price">
                <span>{props.books[0] && props.books[0].price} VNĐ</span>
                <a href="#" className="cart-btn">Add to cart</a>
            </div>
        </div>
    </main>
}
export default connect(
    (state: ApplicationState) => state.books,
    BookStore.actionCreators
)(BookDetail as any)