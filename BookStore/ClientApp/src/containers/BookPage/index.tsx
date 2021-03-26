import * as React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as BookStore from '../../store/Books';
import * as CartStore from '../../store/Cart';
import * as AuthenticateStore from '../../store/Authentication';
import BookCard from '../../components/BookCard';
import SideBar from '../../components/SideBar';
import { Hidden, Snackbar } from '@material-ui/core';

const creator = { ...BookStore.actionCreators, ...CartStore.actionCreators };
type BookProps = BookStore.BookState & AuthenticateStore.AuthenticateState & typeof creator
const BookPage = (props: BookProps) => {

    const useStyles = makeStyles((theme) => ({
        center: {
            margin: '0 auto'
        }
    }))

    const [message, setMessage] = React.useState("");


    const addToCart = (bookId: number) => {
        props.addToCart({
            userId: props.authenticate.id || -1,
            bookId: bookId,
            quantity: 1
        }, setMessage)
        setOpen(true);
    }

    React.useEffect(() => {
        props.requestBooks();
    }, []);

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <Grid container>
            <Grid item md={3}>
                <Hidden smDown>
                    <SideBar />
                </Hidden>
            </Grid>
            <Grid item xs={ 12 } md={ 9 }>
                <Container>
                    <Grid className={classes.center} container spacing={4}>
                        {props.books.map((book, index) => {
                            return <Grid item key={index} xs={12} sm={4}>
                                <BookCard book={book} addToCart={addToCart} />
                            </Grid>
                        })}
                    </Grid>
                </Container>
                {message && <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} message={message} />}
            </Grid>
        </Grid>
    )
}

export default connect(
    (state: ApplicationState) => { return { ...state.books, ...state.authenticate } },
    { ...BookStore.actionCreators, ...CartStore.actionCreators }
)(BookPage as any);