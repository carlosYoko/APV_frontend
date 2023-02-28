import usePatients from "../hooks/usePatients";
import Patient from "./Patient";

const ListPatients = () => {
  const { patients } = usePatients();

  return (
    <>
      {patients.length ? (
        <>
          <h2 className="font-black text-xl text-center">
            Listado de pacientes
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus{" "}
            <span className="text-indigo-600 font-bold">Pacientes</span>
          </p>
          {patients.map((patient) => (
            <Patient key={patient._id} patient={patient} />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-xl text-center">No hay pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Agrega <span className="text-indigo-600 font-bold">Pacientes</span>
          </p>
        </>
      )}
    </>
  );
};

export default ListPatients;
