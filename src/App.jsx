import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css' 
import Menu from './componentes/Menu'
import Home from './componentes/Home'
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import Donos from './componentes/telas/dono/Dono'
import Pets from './componentes/telas/pet/Pet'
import MenuPrivado from './componentes/MenuPrivado'
import MenuPublico from './componentes/MenuPublico'

// Faltou import login
import Login from './componentes/telas/login/Login'



// function App() {
//   return (
//       <Router>
//         <Menu/>
//         <Routes>
//           <Route exact="true" path="/" element={<Home/>}/>
//           <Route exact="true" path="/donos" element={<Dono/>}/>
//           <Route exact="true" path="/pets" element={<Pet/>}/>
//         </Routes>
//       </Router>
//   );
// }

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<MenuPublico />}  >
          <Route index   element={<Home />} />
          <Route exact="true" path="/login" element={<Login />} />
        </Route>

        <Route  path="/privado" element={<MenuPrivado />}  >
          <Route index   element={<Home />} />
          <Route exact="true" path="donos" element={<Donos />} />
          <Route exact="true" path="pets" element={<Pets />} />
          <Route exact="true" path="login" element={<Login />} />
        </Route>        
      </Routes>
    </Router>
 
  );
}

export default App;
