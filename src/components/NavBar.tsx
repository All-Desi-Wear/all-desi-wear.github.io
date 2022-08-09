import * as React from "react";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Indian Clothes
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/monalie-sarees">
                Monalie Sarees
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/mirraw">
                Mirraw
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/sherni-london">
                Sherni London
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/all-products">
                All Products
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/search">
                Search &nbsp;

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 490 490"
                  width="15.3125"
                  height="15.3125"
                >
                  <path
                    fill="none"
                    stroke="#000"
                    stroke-width="36"
                    stroke-linecap="round"
                    d="m280,278a153,153 0 1,0-2,2l170,170m-91-117 110,110-26,26-110-110"
                  />
                </svg>
              </a>
            </li>
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a> */}
            {/* <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul> 
            </li>
            <li className="nav-item">
              <a className="nav-link disabled">Disabled</a>
            </li>*/}
          </ul>
          {/* <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
