import MenuItem from "@mui/material/MenuItem"
import { useEffect, useState } from "react"
import { useOidcAccessToken } from "@axa-fr/react-oidc"

const IPRangeOptions = () => {
    const { accessToken, accessTokenPayload } = useOidcAccessToken()

    const [iprange, setIPRange] = useState<any[]>([])
    const [error, setError] = useState<String>("")
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_DOMAIN}/api/admin/iprange`, {
            headers: { "Authorization": `Bearer ${accessToken}` }
        })
        .then(response => {
            if(!response.ok) throw new Error(`Server Returned Error: ${response.status}`);
            return response.json();
        })
        .then(json => setIPRange(json))
        .catch(error => setError(error))
    }, [])
    return iprange.map((range: any) => <MenuItem key={range.id} value={range.id}>{range.name}</MenuItem>)
}

export default IPRangeOptions