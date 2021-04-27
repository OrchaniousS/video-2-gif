import * as React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import { mainData } from "../mock/data"
import Head from "../components/Head"
import VideoContainer from "../components/VideoContainer"
import Navbar from "../components/Navbar"
import Footer from "../components/footer"

import "semantic-ui-css/semantic.min.css"
import "../style/index.css"

export default function Home() {
  const { title, lang, description } = mainData

  return (
    <Router>
      <Head title={title} lang={lang} description={description} />
      <Navbar />
      <Route exact path="/" component={VideoContainer} />
      <Footer />
    </Router>
  )
}
