import { useOidcAccessToken, useOidcIdToken } from "@axa-fr/react-oidc"
import { FormControl, Grid, MenuItem, Select, TextField } from "@mui/material"
import GridItem from "../components/GridItem"
import GroupOptions from "../callbacks/GroupOptions"
import IPRangeOptions from "../callbacks/IPRangeOptions"
import DNSZoneOptions from "../callbacks/DNSZoneOptions"
import Button from '@mui/material/Button';
import { is_admin } from '../UserInfo'
import { useState } from "react"

const CreateDevice: React.FunctionComponent = () => {
    const handleSubmit = (e: any) => {
        console.log(e);
    }
    // important hooks
    const { accessToken, accessTokenPayload } = useOidcAccessToken()
    const { idToken, idTokenPayload } = useOidcIdToken()  // this is how you get the users id token
    const [iprange, setIPRange] = useState("")
    const [dnszone, setDNSZone] = useState("")
    const [group, setGroup] = useState("")
    const [staticIp, setStaticIp] = useState(false)
    return (
        <div>
            <h1>Create Device</h1>
            <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={2}
            >
                <Grid item xs={12}>
                    <GridItem>
                        <form onSubmit={handleSubmit}>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <h4 style={{textAlign: 'left'}}>System Name</h4>
                                <TextField id="standard-basic" name="System Name" inputProps={{pattern: "^(?![0-9]+$)(?!-)[a-zA-Z0-9-]{,63}(?<!-)$"}} variant="standard"/>
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <h4 style={{textAlign: 'left'}}>MAC Address</h4>
                                <TextField id="standard-basic" name="MAC Address" inputProps={{pattern: "[[0-9a-fA-F]:]{5}[0-9a-f]"}} variant="standard"/>
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <h4 style={{textAlign: 'left'}}>IP Range</h4>
                                <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="IPRange"
                                name="iprange"
                                value={iprange}
                                onChange={(e) => setIPRange(e.target.value)}
                                >
                                    {IPRangeOptions()}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <h4 style={{textAlign: 'left'}}>IP Assignment</h4>
                                <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="IPAssignment"
                                name="ipassignment"
                                onChange={(e) => setStaticIp(e.target.value === "Static")}
                                >
                                    <MenuItem value="Static">Static</MenuItem>
                                    <MenuItem value="DHCP">DHCP</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }}>
                            <h4 style={{textAlign: 'left'}}>IP Address</h4>
                                <TextField disabled={!staticIp} id="standard-basic" name="System Name" variant="standard"/>
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <h4 style={{textAlign: 'left'}}>Create DNS</h4>
                                <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="createdns"
                                name="createdns"
                                >
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <h4 style={{textAlign: 'left'}}>DNS Zone</h4>
                                <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="DNSZone"
                                name="dnszone"
                                value={dnszone}
                                onChange={(e) => setDNSZone(e.target.value)}
                                >
                                    {DNSZoneOptions()}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <h4 style={{textAlign: 'left'}}>Owner</h4>
                                <TextField id="standard-basic" name="Owner" disabled={!is_admin(idTokenPayload)} value={idTokenPayload.preferred_username} variant="standard"/>
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <h4 style={{textAlign: 'left'}}>Group</h4>
                                <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="Group"
                                name="group"
                                value={group}
                                onChange={(e) => setGroup(e.target.value)}
                                >
                                    {GroupOptions()}
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="success" type="submit">Create</Button>
                        </form>
                    </GridItem>
                </Grid>
            </Grid>
        </div>
    )
}

export default CreateDevice