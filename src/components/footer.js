import React from "react"

const Footer = () => {
  return (
    <>
      <footer>
        <div className="social-links">
          <a
            href="https://codepen.io/Orchanious"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="codepen"
          >
            <i className="fa fa-codepen fa-inverse"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/orchan-magramov-225231137/"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="linkedin"
          >
            <i className="fa fa-linkedin fa-inverse"></i>
          </a>
          <a
            href="https://github.com/OrchaniousS"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="github"
          >
            <i className="fa fa-github fa-inverse"></i>
          </a>
        </div>
        <hr />
        <div className="credits"> Created by Orchan Magramov © 2020.</div>
      </footer>
    </>
  )
}

export default Footer
