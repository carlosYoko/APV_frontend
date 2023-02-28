import { createContext, useState, useEffect } from "react";
import clientAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PatientsContext = createContext();

const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [patientEdit, setPatientEdit] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    const getPatients = async () => {
      try {
        const token = localStorage.getItem("apv_token_");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clientAxios.get("/patients", config);

        setPatients(data);
      } catch (error) {
        console.log(error);
      }
    };
    getPatients();
  }, [auth]);

  const savePatient = async (patient) => {
    const token = localStorage.getItem("apv_token_");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (patient.id) {
      try {
        const { data } = await clientAxios.put(
          `/patients/${patient.id}`,
          patient,
          config
        );
        const patientsUpdated = patients.map((patientState) =>
          patientState._id === data._id ? data : patientState
        );
        setPatients(patientsUpdated);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const data = await clientAxios.post("/patients", patient, config);
        const { createdAt, updatedAt, __v, ...patientSaved } = data.data;
        setPatients([patientSaved, ...patients]);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  const setEdition = (patient) => {
    setPatientEdit(patient);
  };

  const deletePatient = async (id) => {
    const confirmed = confirm("Estas seguro?");

    if (confirmed) {
      try {
        const token = localStorage.getItem("apv_token_");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        clientAxios.delete(`/patients/${id}`, config);
        const patientsUpdated = patients.filter(
          (patientsState) => patientsState._id !== id
        );
        setPatients(patientsUpdated);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <PatientsContext.Provider
      value={{ patients, savePatient, setEdition, patientEdit, deletePatient }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

export { PatientsProvider };
export default PatientsContext;
