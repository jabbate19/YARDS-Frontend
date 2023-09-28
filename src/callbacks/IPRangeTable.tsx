import { useEffect, useState } from "react"
import Loading from './Loading';
import LinkTable from '../components/LinkTable';
import { useOidcAccessToken, useOidc, useOidcIdToken } from '@axa-fr/react-oidc'

function IPRangeTable() {
  const [ranges, setRanges] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { accessToken, accessTokenPayload } = useOidcAccessToken()
  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_API_DOMAIN}/api/admin/iprange`, {
      headers: { "Authorization": `Bearer ${accessToken}` }
    })
      .then(response => {
        if(!response.ok) throw new Error(`Server Returned Error: ${response.status}`);
        return response.json();
      })
      .then(json => setRanges(json))
      .catch(error => setError(error))
      .finally(() => {
        setLoading(false)
      })
  }, [])
  let tableData = {
    columns: ["Server ID", "Server Name", "Network", "Description"],
    rows: ranges.map((server: any) => {return {
        link: `/iprange/${server.id}`,
        data: [server.id, server.name, `${server.networkid}/${server.cidr}`, server.description]
    }})
  };
  return (
    <div>
      {loading ? (
        <Loading/>
      ) : (
        <>
          <h1>IP Ranges</h1>
          {error ? <h1>Err: {JSON.stringify(error)}</h1> : <LinkTable columns={tableData.columns} rows={tableData.rows}/>}
        </>
      )}
    </div>
  )
}

export default IPRangeTable