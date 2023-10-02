import { useOidcAccessToken, useOidc, useOidcIdToken } from '@axa-fr/react-oidc'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Authenticating from '../callbacks/Authenticating'
import AuthenticationError from '../callbacks/AuthenticationError'
import SessionLost from '../callbacks/SessionLost'
import UserInfo from '../UserInfo'
import DeviceTable from "../callbacks/DeviceTable"
import ServerTable from "../callbacks/ServerTable"
import { useEffect, useState } from "react"
import Loading from '../callbacks/Loading';
import LinkTable from '../components/LinkTable';

const Device = () => {
    // important hooks
    const { accessToken, accessTokenPayload } = useOidcAccessToken()
    const { id } = useParams();
    // const { idToken, idTokenPayload } = useOidcIdToken()  // this is how you get the users id token
    // const { login, logout, isAuthenticated } = useOidc()  // this gets the functions to login and logout and the logout state
    const [data, setData] = useState([{
        interface: {id: 0, name: "", macaddr: "", comments: ""},
        addresses: [{id: 0, iprangeid: 0, iptype: ""}],
        static_addresses: [{ipaddr: ""}]
    }])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    useEffect(() => {
        setLoading(true)
        fetch(`${process.env.REACT_APP_API_DOMAIN}/api/device/${id}`, {
        headers: { "Authorization": `Bearer ${accessToken}` }
        })
        .then(response => {
            if(!response.ok) throw new Error(`Server Returned Error: ${response.status}`);
            return response.json()
        })
        .then(json => setData(json))
        .catch(error => setError(error))
        .finally(() => {
            setLoading(false)
        })
    }, [])
    let interfaceData = {
        columns: ["Interface ID", "Interface Name", "MAC Address", "Comments"],
        rows: data.map((dev: any) => {return {
            link: `/interface/${dev.interface.id}`,
            data: [dev.interface.id.toString(), dev.interface.name, dev.interface.macaddr, dev.interface.comments]
        }})
      };
    let addressData = {
        columns: ["ID", "IP Range ID", "IP Type", "Address"],
        rows: [{link: "", data: [""]}]
    };
    for (let i = 0; i < data[0].addresses.length; i++) {
        addressData.rows.push({
            link: `/address/${data[0].addresses[i].id}`,
            data: [data[0].addresses[i].id.toString(), data[0].addresses[i].iprangeid.toString(), data[0].addresses[i].iptype, data[0].addresses[i].iptype === 'Static' ? data[0].static_addresses[i].ipaddr : "N/A"]
        })
    }
    addressData.rows.splice(0, 1);
    return (
      <div>
          {loading ? (
              <Loading/>
          ) : (
          <>
              {error ? <h1>Err: {JSON.stringify(error)}</h1> : (
                  <>
                      <h1>Interfaces</h1>
                      <LinkTable columns={interfaceData.columns} rows={interfaceData.rows}/>
                      <h1>Addresses</h1>
                      <LinkTable columns={addressData.columns} rows={addressData.rows}/>
                  </>
              )}
          </>
          )}
      </div>
    )
}

export default Device