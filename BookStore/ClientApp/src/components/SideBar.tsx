import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import * as CategoryStore from '../store/Category';
import * as BookStore from '../store/Books';
import { ApplicationState } from '../store';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
        },
    }),
);

type CategoryProps = CategoryStore.CategoryState & BookStore.BookState & typeof BookStore.actionCreators;
function CheckboxList(props: CategoryProps) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        console.log(newChecked);
        props.requestBookByCategory(newChecked);
        setChecked(newChecked);
    };

    return (
        <React.Fragment>
            <Typography variant="h5" style={{ 'marginBottom': '15px' }}>Categories</Typography>
        <List className={classes.root}>
            {props.categories.map((category: CategoryStore.Category, index: number) => {
                const labelId = 'category-' + category.id;
                return (
                    <ListItem key={index} role={undefined} dense button onClick={handleToggle(category.id)}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={checked.indexOf(category.id) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`${category.name}`} />
                    </ListItem>
                );
            })}
            </List>
        </React.Fragment>
    );
}

export default connect(
    (state: ApplicationState) => state.categories,
    BookStore.actionCreators
)(CheckboxList as any);