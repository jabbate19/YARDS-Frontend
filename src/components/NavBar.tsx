import React from 'react'
import {
    Collapse,
    Container,
    Nav,
    Navbar,
    NavbarToggler,
    NavItem,
} from 'reactstrap'
import { NavLink } from 'react-router-dom'
import Profile from './Profile'
import { useOidcAccessToken, useOidc, useOidcIdToken } from '@axa-fr/react-oidc'
import { is_admin } from '../UserInfo'

const NavBar: React.FunctionComponent = () => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false)
    const { idToken, idTokenPayload } = useOidcIdToken()
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    let adminNav;
    if (is_admin(idTokenPayload)) {
        adminNav = (
            <NavItem>
                <NavLink to='/admin' className='nav-link'>
                    Admin
                </NavLink>
            </NavItem>
        )
    }
    return (
        <div>
            <Navbar color='primary' dark expand='lg' fixed='top'>
                <Container>
                    <NavLink to='/' className={'navbar-brand'}>
                        YARDS
                    </NavLink>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink to='/' className='nav-link'>
                                    Home
                                </NavLink>
                            </NavItem>
                            {
                                adminNav
                            }
                        </Nav>
                        <Nav navbar className='ml-auto'>
                            <Profile />
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar