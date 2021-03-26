import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './containers/Login';
import Counter from './components/Counter';
import './custom.css'
import SignUp from './containers/SignUp';
import BookManage from './containers/BookManage';
import BookPage from './containers/BookPage';
import BookDetail from './containers/BookDetail';
import * as CategoryStore from './store/Category';
import { ApplicationState } from './store';
import { connect } from 'react-redux';
import { PublicRoute } from './routes/PublicRoute';
import { PrivateRoute } from './routes/PrivateRoute';
import { HashRouter } from 'react-router-dom'
import CartPage from './containers/CartPage';
import HistoryPage from './containers/HistoryPage';
type CategoryProps = CategoryStore.CategoryState & typeof CategoryStore.actionCreators

const App = (props: CategoryProps) => {
    React.useEffect(() => {
        console.log(1)
        props.requestCategories();
    }, [])
    if (props.isLoading) {
        return <div>Loading</div>
    }
    return <HashRouter>
        <Switch>
            <PublicRoute key="login" exact path='/' component={Login} />
            <PublicRoute key="signup" exact path='/signup' component={SignUp} />
            <Layout>
                <PrivateRoute exact path='/home' key="home" component={BookPage} />
                <PrivateRoute exact path='/history' key="history" component={HistoryPage} />
                <PrivateRoute exact path='/counter' key="counter" component={Counter} />
                <PrivateRoute exact path='/admin/home' key="admin/home/managebook" component={BookManage} />
                <PrivateRoute key="cartpage" path="/cart" exact component={CartPage} />
                <PrivateRoute key="book/id" path='/book/:id?' component={BookDetail} />
            </Layout>
            <Route component={(props: any) => <div>Not found</div>} />
        </Switch>
</HashRouter>
};

export default connect(
    (state: ApplicationState) => state.categories,
    CategoryStore.actionCreators
)(App as any);