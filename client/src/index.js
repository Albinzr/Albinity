import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './router/router.js'
import '../public/css/main.css'
import '../public/js/main.js'

const App = () => <Routes />

const root = document.getElementById('root')

ReactDOM.render(<App />, root)
