import "./App.css";
import {Routes,Route} from 'react-router-dom'
import Register from "./components/register/register";
import Login from "./components/login/login";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import Homepage from "./components/homepage/homepage";
import Profile from "./components/profile/profile";
import AddMovie from "./routes/addMovie/addMovie";
import ProtectRoutes from "./components/protectRoutes/protectRoutes";


function App() {

  return (
    <div className="App">
       <Provider store={store}>
      <Routes>
        <Route path="/sign-up" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/profile" element={ <ProtectRoutes> <Profile />  </ProtectRoutes> } />
        <Route path="/add_movie" element={ <ProtectRoutes> <AddMovie /> </ProtectRoutes>} />
      </Routes>
      </Provider> 
    </div>
  );
}

export default App;
