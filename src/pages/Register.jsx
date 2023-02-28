import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password, repeatPassword].includes("")) {
      setAlert({ msg: "Hay campos vacios", error: true });
      return;
    }

    if (password !== repeatPassword) {
      setAlert({ msg: "El password tiene que coincidir", error: true });

      return;
    }

    if (password.length && repeatPassword.length < 8) {
      setAlert({
        msg: "El password tiene que ser minimo 8 caracteres",
        error: true,
      });
      return;
    }
    setAlert({});

    try {
      await clientAxios.post("/vet", { name, email, password });
      setAlert({ msg: "Cuenta creada, revisa tu email", error: false });
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };

  const msg = alert.msg;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea una cuenta para administrar tus
          <span className="text-black"> Pacientes </span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg ? <Alert alert={alert} /> : ""}

        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Nombre
            </label>
            <input
              type={"text"}
              placeholder={"Nombre de registro"}
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type={"email"}
              placeholder={"Email de registro"}
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input
              type={"password"}
              placeholder={"Password de registro"}
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Repetir Password
            </label>
            <input
              type={"password"}
              placeholder={"Repite el password de registro"}
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Registrarme"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/" className="block text-center my-5 text-gray-500">
            Iniciar sesion
          </Link>
          <Link
            to="/forget-password"
            className="block text-center my-5 text-gray-500"
          >
            Recordar password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Register;
