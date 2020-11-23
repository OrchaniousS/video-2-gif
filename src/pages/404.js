import React from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"

import { mainData } from "../mock/data"

export default () => {
  const { lang } = mainData

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Page not found</title>
        <html lang={lang || "en"} />
        <meta name="description" content="Page not found" />
      </Helmet>
      <section id="hero" className="jumbotron">
        <div>
          <div>
            <h1>
              Sorry, this path does not exist{" "}
              <span role="img" aria-label="emoji">
                😞
              </span>
            </h1>
          </div>
          <div>
            <p className="hero-cta justify-content-center">
              <Link className="cta-btn cta-btn--hero" to="/">
                Go back
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
