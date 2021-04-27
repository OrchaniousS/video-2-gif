import React from "react"
import { Helmet } from "react-helmet"

export default function Head(props): JSX.Element {
  const { title, lang, description } = props
  return (
    <Helmet>
      <title>{title}</title>
      <html lang={lang || "en"} />
      <meta name="description" content={description} />
    </Helmet>
  )
}
