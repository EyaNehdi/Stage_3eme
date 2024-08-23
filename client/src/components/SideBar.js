import logo from '../assets/telecom.png'
import '../css/SideBar.css'
function SideBar ()
{
    return (
<nav id="sidebar">
    <div className="sidebar-header">
    <img src={logo} alt="Logo" className="logo" />
    </div>
    
    <ul className="list-unstyled components">
      <p>Projet:<br></br>
        Offre de Gros</p>
      <br></br>
      <br></br>
      <li>
        <a href="/home">Ajouter </a>
      </li>
      <br></br>
      <br></br>
      <li>
        <a href="/Afficher">Afficher</a>
      </li>
    </ul>
  </nav> )
}
export default SideBar