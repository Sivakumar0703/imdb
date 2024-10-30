import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getMovies } from "../../redux/middleware/movie.thunk";
import { searchResultOnMyMovies } from "../../logics/movies.logics";
import { searchResultForMyMovies } from "../../redux/slice/movie.slice";

const Navbar = () => {

    const [search , setSearch] = useState("");
    const {myUrl,imdbUrl,myMovies} = useSelector(state => state.movieReducer);
    const dispatch = useDispatch();
    const token = sessionStorage.getItem("user");
    const navigate = useNavigate();

    function handleSearch(e){
        e.preventDefault();
        let data = {token , myUrl , imdbUrl , search  }
        dispatch(getMovies(data))
        const searchResultForMymovies = searchResultOnMyMovies(myMovies,search)
        dispatch(searchResultForMyMovies(searchResultForMymovies))
    }

    function logout(){
      sessionStorage.removeItem("user");
      navigate('/');
    }



  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             
               <li className="nav-item">
                <NavLink className={({isActive}) => isActive ? "active-nav-option nav-link" : "nav-link"} aria-current="page" to="/">
                  Home
                </NavLink>
              </li>

              { token && 
               <>
              <li className="nav-item">
                <NavLink className={({isActive}) => isActive ? "active-nav-option nav-link" : "nav-link"} to="/profile">
                  Profile
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className={({isActive}) => isActive ? "active-nav-option nav-link" : "nav-link"} to="/add_movie">
                  Add
                </NavLink>
              </li> </>
              }

              {
                !token ? 
                <li className="nav-item">
                <NavLink className={({isActive}) => isActive ? "active-nav-option nav-link" : "nav-link"} to="/login">
                  Login
                </NavLink>
              </li>
              :
              <li className="nav-item">
              <span className="nav-link" style={{cursor:"pointer"}} onClick={logout}> Logout </span>
              </li>
              }

            </ul>
            <form name="search-form" className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
