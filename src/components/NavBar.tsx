import { useState } from 'react'
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
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ShieldIcon from '@mui/icons-material/Shield';

const NavBar: React.FunctionComponent = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { idToken, idTokenPayload } = useOidcIdToken()
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    let adminNav;
    if (is_admin(idTokenPayload)) {
        adminNav = (
            <NavItem>
                <NavLink to='/admin' className='nav-link'>
                    <ShieldIcon/>
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
                                    <HomeIcon/>
                                    Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to='/search' className='nav-link'>
                                    <SearchIcon/>
                                    Search
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