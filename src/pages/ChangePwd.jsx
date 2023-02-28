import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alert from "../components/Alert";
import useAuth from "../hooks/useAuth";

const ChangePwd = () => {
  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState({
    pwd_actual: "",
    pwd_new: "",
    rpwd_new: "",
  });

  const { savePassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(password).some((input) => input === "")) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    if (password.pwd_new.length < 8) {
      setAlert({
        msg: "El password debe tener minimo 8 caracteres",
        error: true,
      });
      return;
    }

    if (password.pwd_new !== password.rpwd_new) {
      setAlert({
        msg: "El nuevo password no coincide",
        error: true,
      });
      return;
    }

    const response = await savePassword(password);
    setAlert(response);
  };

  const { msg } = alert;

  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">
        Cambiar Password
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Cambia tu <span className="text-indigo-600 font-bold">Password</span>
      </p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alert alert={alert} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label
                htmlFor="pwd_actual"
                className="uppercase font-bold text-gray-600"
              >
                Password Actual
              </label>
              <input
                id="pwd_actual"
                name="pwd_actual"
                type="password"
                placeholder="Tu password actual"
                className="border bg-gray-50 w-full p-2 mt-5"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-3">
              <label
                htmlFor="pwd_new"
                className="uppercase font-bold text-gray-600"
              >
                Nuevo Password
              </label>
              <input
                id="pwd_new"
                name="pwd_new"
                type="password"
                placeholder="Tu nuevo password"
                className="border bg-gray-50 w-full p-2 mt-5"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-3">
              <label
                htmlFor="rpwd_new"
                className="uppercase font-bold text-gray-600"
              >
                Repite Nuevo Password
              </label>
              <input
                id="rpwd_new"
                name="rpwd_new"
                type="password"
                placeholder="Repite tu nuevo password"
                className="border bg-gray-50 w-full p-2 mt-5"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <input
              type="submit"
              value="Guardar nuevo password"
              className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePwd;
