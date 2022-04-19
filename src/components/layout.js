import * as React from "react"
import { Link } from "gatsby"
import { throttle } from "lodash";

import favicon32 from "../images/favicon.32.png"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  // let header

  // if (isRootPath) {
  //   header = (
  //     <h1 className="main-heading">
  //       <Link to="/">{title}</Link>
  //     </h1>
  //   )
  // } else {
  //   header = (
      
  //   )
  // }

  const [isScrolled, setIsScrolled] = React.useState("");

  const throttledScroll = throttle(() => {
    if (window.scrollY) {
      setIsScrolled("scrolled");
    } else {
      setIsScrolled("");
    }
  }, 300);

  React.useEffect(() => {
    window.addEventListener('scroll', throttledScroll);
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [throttledScroll])

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className={`global-header ${isScrolled}`}>
        <Link to="/" className="heading-wrapper">
          <div className="heading-favicon">
            <img src={favicon32} alt="Elenchus' Dev Docs favicon" />
          </div>
          <div className="heading-title">{title}</div>
        </Link>
      </header>
      <main className="main-wrapper">{children}</main>
      <footer>
        Copyright © Elenchus All rights reserved.
      </footer>
    </div>
  )
}

export default Layout
