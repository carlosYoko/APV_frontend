import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { logOut } = useAuth();
  return (
    <header className="py-10 bg-indigo-600">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="font-bold text-xl text-indigo-200 text-center">
          Administrador pacientes <span className="text-white">Veterinaro</span>
        </h1>
        <nav className="flex flex-col lg:flex-row items-center gap-4 mt-5 lg:mt-0">
          <Link to="/admin" className="text-white text-sm uppercase font-bold ">
            Pacientes
          </Link>
          <Link
            to="/admin/profile"
            className="text-white text-sm uppercase font-bold "
          >
            Perfil
          </Link>
          <button
            type="button"
            className="text-white text-sm uppercase font-bold"
            onClick={logOut}
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
