import { useEffect, useState } from "react"
import Loading from './Loading';
import LinkTable from '../components/LinkTable';
import { useOidcAccessToken, useOidc, useOidcIdToken } from '@axa-fr/react-oidc'

function ServerTable() {
  const [servers, setServers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { accessToken, accessTokenPayload } = useOidcAccessToken()
  useEffect(() => {
    setLoading(true)
    fetch("http://vader.csh.rit.edu:8000/api/admin/server", {
      headers: { "Authorization": `Bearer ${accessToken}` }
    })
      .then(response => {
        if(!response.ok) throw new Error(`Server Returned Error: ${response.status}`);
        return response.json();
      })
      .then(json => setServers(json))
      .catch(error => setError(error))
      .finally(() => {
        setLoading(false)
      })
  }, [])
  let tableData = {
    columns: ["Server ID", "Server Name", "Last Check-In", "DNS Update", "DHCP Update"],
    rows: servers.map((server: any) => {return {
        link: `/server/${server.id}`,
        data: [server.id, server.name, new Date(server.lastcheckin).toLocaleString('en-US'), server.dnsupdate, server.dhcpupdate]
    }})
  };
  return (
    <div>
      {loading ? (
        <Loading/>
      ) : (
        <>
          <h1>Servers</h1>
          {error ? <h1>Err: {JSON.stringify(error)}</h1> : <LinkTable columns={tableData.columns} rows={tableData.rows}/>}
        </>
      )}
    </div>
  )
}

export default ServerTable