import * as React from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './containers/Login';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import './custom.css'
import SignUp from './containers/SignUp';
import { BrowserRouter } from 'react-router-dom';
import BookManage from './containers/BookManage';
import BookPage from './containers/BookPage';
import BookDetail from './containers/BookDetail';


export default () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <Layout>
                <Route exact path='/admin/home' component={BookManage} />
                <Route exact path='/home' component={BookPage} />
                <Route exact path='/counter' component={Counter} />
                <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
                <Route path='/book/:id?' component={BookDetail} />
            </Layout>
        </Switch>
    </BrowserRouter>
);
