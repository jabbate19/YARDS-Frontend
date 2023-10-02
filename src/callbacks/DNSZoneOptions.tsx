import MenuItem from "@mui/material/MenuItem"
import { useEffect, useState } from "react"
import { useOidcAccessToken } from "@axa-fr/react-oidc"

const DNSZoneOptions = () => {
    const { accessToken, accessTokenPayload } = useOidcAccessToken()

    const [dnszone, setDNSZone] = useState<any[]>([])
    const [error, setError] = useState<String>("")
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_DOMAIN}/api/admin/dnszone`, {
            headers: { "Authorization": `Bearer ${accessToken}` }
        })
        .then(response => {
            if(!response.ok) throw new Error(`Server Returned Error: ${response.status}`);
            return response.json();
        })
        .then(json => setDNSZone(json))
        .catch(error => setError(error))
    }, [])
    return dnszone.map((zone: any) => <MenuItem value={zone.id}>{zone.zonename}</MenuItem>)
}

export default DNSZoneOptions