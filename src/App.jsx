import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, Container } from 'react-bootstrap'
import { Navbar } from './components';
import { ToastProvider } from './context/toast_context';

import Home from './pages/Home';
import Grant from './pages/Grant';
import ApplyNft from './pages/ApplyNft';
import Spawn from './pages/Spawn';
import Propose from './pages/Propose';
import Attend from './pages/Attend';
import Vote from './pages/Vote';

const routes = [
  {
    path: '/',
    name: 'home',
    element: Home
  },
  {
    path: '/Grant',
    name: 'grant',
    element: Grant
  },
  {
    path: '/ApplyNft',
    name: 'applyNft',
    element: ApplyNft,
  },
  {
    path: '/Spawn',
    name: 'spawn',
    element: Spawn,
  },
  {
    path: '/Propose',
    name: 'propose',
    element: Propose,
  },
  {
    path: '/Vote',
    name: 'vote',
    element: Vote,
  },
  {
    path: '/Attend',
    name: 'attend',
    element: Attend,
  }
]

function App() {

  useEffect(() => {
    console.log('render app')
  })

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    >
      <Router>
        <div className="pt-20">
          <ToastProvider>
            <Navbar />
            <Container className='position-relative'>

              <Routes>
                {
                  routes.map(x => {
                    const Ele = x.element;
                    return (
                      <Route path={x.path} key={x.name} element={<Ele />} />
                    )
                  })
                }
              </Routes>
            </Container>
          </ToastProvider>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
