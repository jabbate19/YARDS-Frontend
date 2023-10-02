import { useEffect, useState } from "react"
import Loading from './Loading';
import LinkDropTable from '../components/LinkDropTable';
import { useOidcAccessToken, useOidc, useOidcIdToken } from '@axa-fr/react-oidc'
import DenseTable from "../components/DenseTable";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from "react-router-dom";

const DNSTable = (props: any) => {
  let dnsData = props.dnsrecords.map((dnsrecord: any) => {return [
    dnsrecord.id.toString(),
    dnsrecord.recordtype,
    dnsrecord.key,
    dnsrecord.value
  ]});
  return (
    <DenseTable columns= {["Record ID", "Record Type", "Record Key", "Record Value"]} rows={dnsData} />
  )
}

const AddressTable = (props: any) => {
  const [iprangeData, setIPRangeData] = useState<any>([{id: "", name: ""}])
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_DOMAIN}/api/admin/iprange`, {
      headers: { "Authorization": `Bearer ${props.accessToken}` }
    })
      .then(response => {
        if(!response.ok) throw new Error(`Server Returned Error: ${response.status}`);
        return response.json();
      })
      .then(json => setIPRangeData(json))
      .catch(error => setError(error))
  }, [])
  let addressRows = props.addresses.map((address: any, index: number) => {return [
    address.id.toString(),
    iprangeData.filter((iprange: {id: number, name: String}) => iprange.id == address.iprangeid).map((x: {name: String}) => x.name)[0],
    address.iptype,
    address.iptype === 'Static' ? props.static_addresses[index].ipaddr : "N/A"
  ]});
  return (
    <>
      {error ? <h1>Error! {JSON.stringify(error)}</h1> : <DenseTable columns= {["Address ID", "IP Range", "Address Type", "Address"]} rows={addressRows} />}
    </>
  )
}

const Dropdown = (props: any) => {
  const [deviceInterfaces, setDeviceInterfaces] = useState<any>([{interface: {id: -1, name: "", macaddr: ""}, addresses: [], static_addresses: []}])
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_DOMAIN}/api/device/${props.device.id}`, {
      headers: { "Authorization": `Bearer ${props.accessToken}` }
    })
      .then(response => {
        if(!response.ok) throw new Error(`Server Returned Error: ${response.status}`);
        return response.json();
      })
      .then(json => setDeviceInterfaces(json))
      .catch(error => setError(error))
  }, [])
  let interfaceRows = deviceInterfaces.map((int: any) => {
    return {
    link: `#`,
    data: [int.interface.id.toString(), int.interface.name, int.interface.macaddr],
    dropdown: (
      <>
        {error ? <h1>Error! {error}</h1> : (
          <>
            <h2>Addresses</h2>
            <AddressTable accessToken={props.accessToken} addresses={int.addresses} static_addresses={int.static_addresses}/>
            <br/>
            <h2>DNS Records</h2>
            <DNSTable dnsrecords={int.dns_records} />
          </>
        )}
      </>
    )
    }}
  );
  return (
    <>
      <LinkDropTable columns={["Interface ID", "Interface Name", "MAC Address"]} rows={interfaceRows} />
    </>
  )  
}

function DeviceTable() {
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { accessToken, accessTokenPayload } = useOidcAccessToken()
  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_API_DOMAIN}/api/device/`, {
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
    columns: ["Device ID", "Device Name", "Device Owner", "Device Comments", "Actions"],
    rows: devices.map((device: any) => {
      return {
        data: [device.id, device.name, device.owner, device.comments, (
          <>
            <IconButton component={Link} to={`/device/${device.id}`} aria-label="view">
              <InfoIcon />
            </IconButton>
            <IconButton component={Link} to={`/device/${device.id}`} aria-label="delete">
              <DeleteIcon />
            </IconButton>
            <IconButton component={Link} to={`/device/${device.id}`} aria-label="edit">
              <ModeEditIcon />
            </IconButton>
          </>
        )],
        dropdown: (
          <Dropdown accessToken={accessToken} device={device}/>
        )
      }
    })
  };
  return (
    <div>
      {loading ? (
        <Loading/>
      ) : (
        <>
          <h1>Devices</h1>
          {error ? <h1>Err: {JSON.stringify(error)}</h1> : <LinkDropTable columns={tableData.columns} rows={tableData.rows}/>}
        </>
      )}
    </div>
  )
}

export default DeviceTable
