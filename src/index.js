import React, {Component} from 'react'
import {render} from 'react-dom'
import {injectNetworkLayer, DefaultNetworkLayer} from 'react-relay'

import {App} from './app/app.jsx'

const token = window.localStorage.getItem('ncsjwt') || null
injectNetworkLayer(new DefaultNetworkLayer('http://192.168.1.69:8000/graphql', {
  headers: {
    Authorization: `Bearer ${token}`
  }
}))

render(<App/>, document.getElementById('app'))
