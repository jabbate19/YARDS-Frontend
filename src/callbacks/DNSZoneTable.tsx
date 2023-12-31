import { useEffect, useState } from "react"
import Loading from './Loading';
import LinkTable from '../components/LinkTable';
import { useOidcAccessToken, useOidc, useOidcIdToken } from '@axa-fr/react-oidc'

function DNSZoneTable() {
  const [zones, setZones] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { accessToken, accessTokenPayload } = useOidcAccessToken()
  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_API_DOMAIN}/api/admin/dnszone`, {
      headers: { "Authorization": `Bearer ${accessToken}` }
    })
      .then(response => {
        if(!response.ok) throw new Error(`Server Returned Error: ${response.status}`);
        return response.json();
      })
      .then(json => setZones(json))
      .catch(error => setError(error))
      .finally(() => {
        setLoading(false)
      })
  }, [])
  let tableData = {
    columns: ["Zone ID", "Zone Name", "Zone Root", "Zone SOA"],
    rows: zones.map((zone: any) => {return {
        link: `/dnszone/${zone.id}`,
        data: [zone.id, zone.zonename, zone.dnsroot, zone.soa]
    }})
  };
  return (
    <div>
      {loading ? (
        <Loading/>
      ) : (
        <>
          <h1>DNS Zones</h1>
          {error ? <h1>Err: {JSON.stringify(error)}</h1> : <LinkTable columns={tableData.columns} rows={tableData.rows}/>}
        </>
      )}
    </div>
  )
}

export default DNSZoneTable