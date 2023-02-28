import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/axios";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [alert, setAlert] = useState({});
  const [tokenValid, setTokenValid] = useState(false);
  const [pswModified, setPswModified] = useState(false);

  const params = useParams();
  const { token } = params;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setAlert({ msg: "El password tiene que coincidir", error: true });

      return;
    }
    if (password.length < 8) {
      setAlert({
        msg: "El password ha de tener minimo 8 caracteres",
        error: true,
      });
      return;
    }
    try {
      const url = `/vet/forget-password/${token}`;
      const { data } = await clientAxios.post(url, { password });
      setAlert({ msg: data.msg });
      setPswModified(true);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  useEffect(() => {
    const checkParams = async () => {
      try {
        await clientAxios(`/vet/forget-password/${token}`);
        setAlert({ msg: "Coloca tu nuevo password" });
        setTokenValid(true);
      } catch (error) {
        setAlert({ msg: "Hubo un error con el enlace", error: true });
      }
    };
    checkParams();
  }, []);

  const { msg } = alert;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Reestablece tu password para administrar tus
          <span className="text-black"> Pacientes </span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alert={alert} />}
        {tokenValid && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Nuevo Password
                </label>
                <input
                  type={"password"}
                  placeholder={"Nuevo password de registro"}
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Repetir nuevo Password
                </label>
                <input
                  type={"password"}
                  placeholder={"Repite el nuevo password de registro"}
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="guardar password"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              />
            </form>

            {pswModified && (
              <Link to="/" className="block text-center my-5 text-gray-500">
                Iniciar sesion
              </Link>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default NewPassword;
