import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Admin from './pages/Admin'
import Device from './pages/Device'
import CreateDevice from './pages/CreateDevice'
import PageContainer from './containers/PageContainer'
import 'csh-material-bootstrap/dist/csh-material-bootstrap.css'
import NotFound from './pages/NotFound'
import GitFooter from './components/GitFooter';

type Props = {
  rerouteHomeOn404?: boolean
}

const App: React.FC<Props> = ({ rerouteHomeOn404 = null }) => {
  return (
    <Router>
      <PageContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path='/admin' element={<Admin />} />
          <Route path="/device">
            <Route path="/device/create" element={<CreateDevice/>} />
            <Route path="/device/:id" element={<Device />} />
          </Route>
          <Route path="/iprange/:id" element={<Device />} />
          <Route path="/dnszone/:id" element={<Device />} />
          <Route path="/server/:id" element={<Device />} />
          <Route path='*' element={rerouteHomeOn404 ?? true ? <Home /> : <NotFound />} />
        </Routes>
        <GitFooter />
      </PageContainer>
    </Router>
  )
}

export default App