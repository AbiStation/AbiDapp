import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { UserCircleIcon } from "@heroicons/react/outline"
import { UserIcon } from "@heroicons/react/solid"
import clsx from "clsx"

import { TransactionContext } from '../context/TransactionContext';
import { useToast } from '../context/toast_context';

import './navbar.css';

const navItems = [
  {
    to: "/Grant",
    text: "Grant",
  },
  {
    to: "/ApplyNft",
    text: "ApplyNft",
  },
  {
    to: "/Spawn",
    text: "Spawn",
  },
  {
    to: "/Propose",
    text: "Propose",
  },
  {
    to: "/Vote",
    text: "Vote",
  },
  {
    to: "/Attend",
    text: "Attend",
  }
]

const truncate = (address) => {
  return address && address.slice(0, 4) + "..." + address.slice(-2)
}

function Button({ text, bg, padding }) {
  return (
    <div>
      <button
        className={`
          ${padding || 'px-6 py-2'} text-sm font-semibold uppercase 
          rounded-sm text-white transition ${bg}`}
      >
        <span>{text}</span>
      </button>
    </div>
  );
}


function MyNavbar() {

  const {
    connectWallet,
    currentAccount,
    handleChange,
    error,
  } = useContext(TransactionContext);
  // const handleWalletConnect = () => {
  //   console.log("Hello Approve")
  // };
  const { showToast } = useToast();

  useEffect(() => {
    if (error) {
      showToast({
        title: 'Error',
        text: error, 
        type: 'warning'
      })
    }
  } , [error]);

  return (
    <div className="fixed left-0 right-0 top-0 h-16 shadow-md border-b-2 border-gray-100 bg-gray-900">
      <div expand="lg" className="flex items-center container mx-auto h-full justify-between">
        <h1 className="font-semibold uppercase text-lg text-gray-200">
          Abi DAO
        </h1>
        <div>
          <div className="flex items-center space-x-5 text-sm">

            <Navbar collapseOnSelect expand="lg" variant="dark">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-lg`}
                aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                placement="end"
                // variant='dark'
                style={{maxWidth: '60%'}}
              >
              <Offcanvas.Header closeButton/>
                <Offcanvas.Body>
                  <Nav>
                    {navItems.map((navItem) => (
                      // TODO: auto hide when clicked
                      <NavLink 
                        to={navItem.to} 
                        key={navItem.text} 
                        className="nav-link text-gray-400 hover:text-gray-100 mr-10"
                      >{navItem.text}</NavLink>
                    ))}
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
              </Navbar.Collapse>
            </Navbar>

            <NavLink
              className={({ isActive }) =>
                clsx(
                  "hover:text-gray-100",
                  isActive &&
                  "text-gray-400",
                )
              }
              to="."
            >
              {currentAccount ? (
                <UserIcon className="text-blue-400 h-8 w-8" />
              ) : (
                <UserCircleIcon className="text-gray-400 hover:text-gray-100 h-8 w-8" />
              )}
            </NavLink>

            {!error && currentAccount ? (
              <div className="text-gray-400">{truncate(currentAccount)}</div>
            ) : (
              <button
                onClick={connectWallet}
                className="p-2 px-4 bg-[#73c000] text-white rounded-xl"
              >
                CONNECT
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default MyNavbar;
