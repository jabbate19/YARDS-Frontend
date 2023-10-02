import MenuItem from "@mui/material/MenuItem"
import { useEffect, useState } from "react"
import { useOidcAccessToken, useOidcIdToken } from "@axa-fr/react-oidc"

const GroupOptions = () => {
    const { accessToken, accessTokenPayload } = useOidcAccessToken()
    const { idToken, idTokenPayload } = useOidcIdToken()
    const [groups, setGroups] = useState<String[]>([])
    const [error, setError] = useState<String>("")
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_DOMAIN}/api/admin/group`, {
            headers: { "Authorization": `Bearer ${accessToken}` }
        })
        .then(response => {
            if(!response.ok) throw new Error(`Server Returned Error: ${response.status}`);
            return response.json();
        })
        .then(json => setGroups(json))
        .catch(error => setError(error))
    }, [])
    console.log(groups);
    return groups.filter((group: any) => idTokenPayload.groups.includes(group.binding)).map((group: any) => <MenuItem value={group.group}>{group.group}</MenuItem>)
}

export default GroupOptions