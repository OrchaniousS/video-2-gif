import * as React from "react"
import { Helmet } from "react-helmet"
import { mainData } from "../mock/data"

import VideoContainer from "../components/video"
import Footer from "../components/footer"
import "../style/index.css"

export default function Home() {
  const { title, lang, description } = mainData
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <html lang={lang || "en"} />
        <meta name="description" content={description} />
      </Helmet>
      <div className="App">
        <div className="mainContainer">
          <h2 className="App-header">Video To Gif Converter</h2>
          <div className="Container">
            <VideoContainer />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
