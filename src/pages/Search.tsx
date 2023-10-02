import { useOidcAccessToken, useOidc, useOidcIdToken } from '@axa-fr/react-oidc'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Authenticating from '../callbacks/Authenticating'
import AuthenticationError from '../callbacks/AuthenticationError'
import SessionLost from '../callbacks/SessionLost'
import UserInfo from '../UserInfo'
import DeviceTable from "../callbacks/DeviceTable"
import GroupOptions from "../callbacks/GroupOptions"
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import LinkTable from '../components/LinkTable'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import GridItem from '../components/GridItem'
import DNSZoneOptions from '../callbacks/DNSZoneOptions'
import IPRangeOptions from '../callbacks/IPRangeOptions'

Object.defineProperty(Array.prototype, 'chunk', {
    value: function(chunkSize: number) {
        var R = [];
        for (var i = 0; i < this.length; i += chunkSize)
        R.push(this.slice(i, i + chunkSize));
        return R;
    }
});

const Search = () => {
    // important hooks
    const { accessToken, accessTokenPayload } = useOidcAccessToken()
    const { idToken, idTokenPayload } = useOidcIdToken()  // this is how you get the users id token
    // const { login, logout, isAuthenticated } = useOidc()  // this gets the functions to login and logout and the logout state
    const [searchData, setSearchData] = useState<any>([])
    const [showData, setShowData] = useState<any>([])
    const [iprange, setIPRange] = useState<any[]>([])
    const [dnszone, setDNSZone] = useState<any[]>([])
    const [nameFilter, setNameFilter] = useState("")
    const [ownerFilter, setOwnerFilter] = useState("")
    const [groupFilter, setGroupFilter] = useState("")
    const [macFilter, setMacFilter] = useState("")
    const [ipFilter, setIpFilter] = useState("")
    const [ipRangeFilter, setIpRangeFilter] = useState(-1)
    // const [dnsFilter, setDnsFilter] = useState("")
    const [dnsZoneFilter, setDnsZoneFilter] = useState(-1)
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [error, setError] = useState(null);
    useEffect(() => {
        setShowDataPaginated(searchData.filter((device: any) => {
            if (nameFilter && !device.name.includes(nameFilter)) return false;
            if (ownerFilter && !device.owner.includes(ownerFilter)) return false;
            if (macFilter && !device.macaddr.includes(macFilter)) return false;
            if (ipFilter && !(device.iptype == "Static" ? device.ipaddr : "DHCP").includes(ipFilter)) return false;
            if (ipRangeFilter != -1 && !(device.iprangeid == ipRangeFilter)) return false;
            return true;
        }).map(
            (device: any) => {return {
                data: [
                    device.name,
                    device.macaddr,
                    device.owner,
                    device.iprange,
                    device.iptype == "Static" ? device.ipaddr : "DHCP"
                ],
                link: `/device/${device.dev_id}`
            }}
        ))
    }, [nameFilter, ownerFilter, macFilter, ipFilter, ipRangeFilter, dnsZoneFilter, groupFilter])
    const updateSearch = (e: any) => {
        if (e.target.name === "name") {
            setNameFilter(e.target.value);
        }
        if (e.target.name === "owner") {
            setOwnerFilter(e.target.value);
        }
        if (e.target.name === "mac") {
            setMacFilter(e.target.value);
        }
        if (e.target.name === "ip") {
            setIpFilter(e.target.value);
        }
        if (e.target.name === "group") {
            setGroupFilter(e.target.value);
        }
        if (e.target.name === "dns") {
            // setDnsFilter(e.target.value);
        }
        if (e.target.name === "dnszone") {
            setDnsZoneFilter(e.target.value);
        }
        if (e.target.name === "iprange") {
            setIpRangeFilter(e.target.value);
        }
    }
    const setShowDataPaginated = (data: any) => {
        let chunks = data.chunk(20);
        setCurrentPage(1);
        if (chunks.length == 0) {
            setShowData([]);
            setPages(1);
            return;
        }
        setPages(chunks.length);
        setShowData(chunks[0]);
    }
    useEffect(() => {
        setShowDataPaginated(showData);
    }, [currentPage]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_DOMAIN}/api/device/search`, {
        headers: { "Authorization": `Bearer ${accessToken}` }
        })
        .then(response => {
            if(!response.ok) throw new Error(`Server Returned Error: ${response.status}`);
            return response.json();
        })
        .then(json => {
            let data: String[][] = json.map((device: any) => {return {
                data: [
                    device.name,
                    device.macaddr,
                    device.owner,
                    device.iprange,
                    device.iptype == "Static" ? device.ipaddr : "DHCP"
                ],
                link: `/device/${device.dev_id}`
            }});
            setSearchData(json)
            setShowDataPaginated(data)
        })
        .catch(error => setError(error))
    }, [])
    
    return (
            <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={2}
            >
                <Grid item xs={3}>
                    <GridItem>
                        <h4>Device Name</h4>
                        <TextField id="standard-basic" name="name" variant="standard" onChange={updateSearch} />
                        <Divider />
                        <h4>Owner</h4>
                        <TextField id="standard-basic" name="owner" variant="standard" onChange={updateSearch} />
                        <Divider />
                        <h4>Group</h4>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Group"
                        name="group"
                        onChange={updateSearch}
                        >
                            <MenuItem value={""}>None</MenuItem>
                            <GroupOptions/>
                        </Select>
                        <br/>
                        <Divider />
                        <h4>MAC Address</h4>
                        <TextField id="standard-basic" name="mac" variant="standard" onChange={updateSearch} />
                        <br/>
                        <Divider />
                        <h4>IP Address</h4>
                        <TextField id="standard-basic" name="ip" variant="standard" onChange={updateSearch} />
                        <br/>
                        <Divider />
                        <h4>IP Range</h4>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="IP Range"
                        name="iprange"
                        onChange={updateSearch}
                        >
                            <MenuItem value={-1}>None</MenuItem>
                            <IPRangeOptions/>
                        </Select>
                        <br/>
                        <Divider />
                        <h4>DNS Hostname</h4>
                        <TextField id="standard-basic" label="Standard" variant="standard" />
                        <br/>
                        <Divider />
                        <h4>DNS Zone</h4>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="DNS Zone"
                        name="dnszone"
                        onChange={updateSearch}
                        >
                            <MenuItem value={-1}>None</MenuItem>
                            <DNSZoneOptions/>
                        </Select>
                    </GridItem>
                </Grid>
                <Grid item xs={9}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <LinkTable columns={["Name", "MAC", "Owner", "Range", "Address"]} rows={showData}/>
                    </div>
                    <br/>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Pagination count={pages} onChange={(_, v) => setCurrentPage(v)} />
                    </div>
                </Grid>
            </Grid>
    )
}

export default Search