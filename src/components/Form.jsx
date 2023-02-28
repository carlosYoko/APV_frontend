import { useEffect, useState } from "react";
import Alert from "./Alert";
import usePatients from "../hooks/usePatients";

const Form = () => {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [date, setDate] = useState(Date.now());

  const [id, setId] = useState(null);

  const [alert, setAlert] = useState({});

  const { savePatient, patientEdit } = usePatients();

  useEffect(() => {
    if (patientEdit?.name) {
      setName(patientEdit.name);
      setOwner(patientEdit.owner);
      setEmail(patientEdit.email);
      setSymptoms(patientEdit.symptoms);
      setDate(patientEdit.date);
      setId(patientEdit._id);
    }
  }, [patientEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([name, owner, email, symptoms, date].includes("")) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    savePatient({ name, owner, email, symptoms, date, id });
    setAlert({
      msg: "Guardado!!",
    });
    setName("");
    setOwner("");
    setEmail("");
    setSymptoms("");
    setDate("");
  };

  const { msg } = alert;

  return (
    <>
      <h2 className="font-black text-xl text-center">
        Administrador de pacientes
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Añadir <span className="text-indigo-600 font-bold">Pacientes</span>
      </p>
      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="pet" className="text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input
            id="pet"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="owner" className="text-gray-700 uppercase font-bold">
            Nombre Propietario
          </label>
          <input
            id="owner"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="symptoms"
            className="text-gray-700 uppercase font-bold"
          >
            Sintomas
          </label>
          <textarea
            id="symptoms"
            type="text"
            placeholder="Sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="date" className="text-gray-700 uppercase font-bold">
            Fecha alta
          </label>
          <input
            id="date"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors rounded-md"
          value={id ? "Actualizar paciente" : "Añadir paciente"}
        />
      </form>
      {msg && <Alert alert={alert} />}
    </>
  );
};

export default Form;
