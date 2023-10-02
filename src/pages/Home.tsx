import { useOidcAccessToken, useOidc, useOidcIdToken } from '@axa-fr/react-oidc'
import React from 'react'
import { Link } from 'react-router-dom'
import Authenticating from '../callbacks/Authenticating'
import AuthenticationError from '../callbacks/AuthenticationError'
import SessionLost from '../callbacks/SessionLost'
import UserInfo from '../UserInfo'
import DeviceTable from "../callbacks/DeviceTable"
import Grid from '@mui/material/Grid'
import GridItem from '../components/GridItem'
import { Button } from 'reactstrap'
import Divider from '@mui/material/Divider'

const Home = () => {
    // important hooks
    const { accessToken, accessTokenPayload } = useOidcAccessToken()
    const { idToken, idTokenPayload } = useOidcIdToken()  // this is how you get the users id token
    // const { login, logout, isAuthenticated } = useOidc()  // this gets the functions to login and logout and the logout state

    return (
        <div>
            <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={2}
            >
                <Grid item xs={2}>
                        <GridItem>
                            <h2>Actions</h2>
                            <Divider/>
                            <br/>
                            <Button color="primary" tag={Link} to="/device/create">Create Device</Button>
                        </GridItem>
                </Grid>
                <Grid item xs={10}>
                    <DeviceTable/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home