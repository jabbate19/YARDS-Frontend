import { useEffect, useState } from "react"
import Loading from './Loading';
import LinkTable from '../components/LinkTable';
import { useOidcAccessToken, useOidc, useOidcIdToken } from '@axa-fr/react-oidc'

function DeviceTable() {
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { accessToken, accessTokenPayload } = useOidcAccessToken()
  useEffect(() => {
    setLoading(true)
    fetch("http://vader.csh.rit.edu:8000/api/device/", {
      headers: { "Authorization": `Bearer ${accessToken}` }
    })
      .then(response => {
        if(!response.ok) throw new Error(`Server Returned Error: ${response.status}`);
        return response.json();
      })
      .then(json => setDevices(json))
      .catch(error => setError(error))
      .finally(() => {
        setLoading(false)
      })
  }, [])
  let tableData = {
    columns: ["Device ID", "Device Name", "Device Owner", "Device Comments"],
    rows: devices.map((device: any) => {return {
        link: `/device/${device.id}`,
        data: [device.id, device.name, device.owner, device.comments]
    }})
  };
  return (
    <div>
      {loading ? (
        <Loading/>
      ) : (
        <>
          <h1>Devices</h1>
          {error ? <h1>Err: {JSON.stringify(error)}</h1> : <LinkTable columns={tableData.columns} rows={tableData.rows}/>}
        </>
      )}
    </div>
  )
}

export default DeviceTable