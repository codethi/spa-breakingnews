import { useState } from 'react'

import Feed from './components/Feed/Feed'
import TopNews from './components/TopNews/TopNews'
import Navbar from './components/Navbar/Navbar'

import './App.css'

function App() {

  return (
    <section className="home">
      <Navbar/>
      <Feed />
    </section>
  )
}

export default App
