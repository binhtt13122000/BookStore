import * as React from 'react';
import { Collapse, Container, DropdownItem, DropdownMenu, DropdownToggle, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import './NavMenu.css';
import { connect } from 'react-redux';
import * as AuthenticationStore from '../store/Authentication';
import { ApplicationState } from '../store';


type AuthenticateProps = AuthenticationStore.AuthenticateState & typeof AuthenticationStore.actionCreators
const NavMenu = (props: AuthenticateProps) => {
    const history = useHistory();
    const [state, setState] = React.useState({
        isOpen: false
    })
    const logout = () => {
        props.logout();
        history.push("/");
    }

    const toggle = () => {
        setState({
            isOpen: !state.isOpen
        });
    }
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">BookStore</NavbarBrand>
                        <NavbarToggler onClick={toggle} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/home">Sản phẩm</NavLink>
                                </NavItem>
                                {props.authenticate.roleId === 1 ? < NavItem >
                                    <NavLink tag={Link} className="text-dark" to="/cart">Giỏ hàng</NavLink>
                                </NavItem> : null}
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/fetch-data">Lịch sử giao dịch</NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Thêm
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={() => logout()}>
                                            Đăng xuất
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
}

export default connect(
    (state: ApplicationState) => state.authenticate,
    AuthenticationStore.actionCreators
)(NavMenu as any);
