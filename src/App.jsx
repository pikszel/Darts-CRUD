import { Routes, Route, NavLink } from 'react-router-dom';
import { JatekosLista } from './pages/JatekosLista';
import { EgyJatekos } from './pages/EgyJatekos';
import { UjJatekos } from './pages/UjJatekos';
import { ModJatekos } from './pages/ModJatekos';
import { DelJatekos } from './pages/DelJatekos';
import './App.css'

export const App = () => {
  return (
    <>
    <nav className="d-flex gap-4 p-3 fs-3">
    <NavLink to="/" className="nav-link">
    <i className="bi bi-grid-fill me-2"></i> Játékosok
    </NavLink> | 
    <NavLink to="/new-player" className="nav-link">
    <i className="bi bi-plus-square me-2"></i> Új játékos
    </NavLink>
    </nav>
    <Routes>
      <Route path="/" element={<JatekosLista />} />
      <Route path="/player/:playerId" element={<EgyJatekos />} />
      <Route path="/new-player" element={<UjJatekos />} />
      <Route path="/mod-player/:playerId" element={<ModJatekos />} />
      <Route path="/del-player/:playerId" element={<DelJatekos />} />
    </Routes>
    </>
  )
};
