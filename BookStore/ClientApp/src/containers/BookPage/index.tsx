import * as React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as BookStore from '../../store/Books';
import BookCard from '../../components/BookCard';

type BookProps = BookStore.BookState & typeof BookStore.actionCreators
const BookPage = (props: BookProps) => {

    const useStyles = makeStyles((theme) => ({
        center: {
            margin: '0 auto'
        }
    }))

    React.useEffect(() => {
        props.requestBooks();
    }, []);

    const classes = useStyles();

    return (
        <Container>
            <Grid className={classes.center} container spacing={4}>
                    {props.books.map((book, index) => {
                        return <Grid item key={index} xs={ 12 } sm={ 4 }>
                            <BookCard book={book} />
                        </Grid>
                    })}
            </Grid>
        </Container>
    )
}

export default connect(
    (state: ApplicationState) => state.books,
    BookStore.actionCreators
)(BookPage as any);