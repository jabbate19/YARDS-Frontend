import { useOidcAccessToken, useOidc, useOidcIdToken } from '@axa-fr/react-oidc'
import React from 'react'
import { Link } from 'react-router-dom'
import Authenticating from '../callbacks/Authenticating'
import AuthenticationError from '../callbacks/AuthenticationError'
import SessionLost from '../callbacks/SessionLost'
import UserInfo from '../UserInfo'
import ServerTable from "../callbacks/ServerTable"
import IPRangeTable from "../callbacks/IPRangeTable"
import DNSZoneTable from "../callbacks/DNSZoneTable"

const Admin = () => {
    // important hooks
    const { accessToken, accessTokenPayload } = useOidcAccessToken()
    const { idToken, idTokenPayload } = useOidcIdToken()  // this is how you get the users id token
    // const { login, logout, isAuthenticated } = useOidc()  // this gets the functions to login and logout and the logout state

    return (
        <div>
            <ServerTable/>
            <IPRangeTable/>
            <DNSZoneTable/>
        </div>
    )
}

export default Admin