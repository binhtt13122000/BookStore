import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router';


const useStyles = makeStyles({
    root: {
    },
    media: {
        height: 140,
    },
});

export default function BookCard(props: any) {
    const history = useHistory();
    const classes = useStyles();
    const { book } = props;
    return (
        <Card className={classes.root}>
            <CardActionArea onClick={e => history.push('/book/' + book.id)}>
                <CardMedia
                    className={classes.media}
                    image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {book.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Tác giả: { book.author }
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Loại sách: {book.category && book.category.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Giá bán: {book.price} VNĐ
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Grid container justify="flex-end">
                    <Button variant="contained" size="small" color="primary">
                        Add to Cart
                    </Button>
                </Grid>
            </CardActions>
        </Card>
    );
}