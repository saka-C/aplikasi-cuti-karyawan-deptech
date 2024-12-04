import React, { useState, useEffect } from "react";
import Formcontainer from "../components/Formcontainer";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RequestLeave = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [pegawai, setPegawai] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [selectedPegawai, setSelectedPegawai] = useState("");
  const [leaveStartDate, setLeaveStartDate] = useState("");
  const [leaveEndDate, setLeaveEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch pegawai
    axios
      .get("https://674ec4c5bb559617b26c95e9.mockapi.io/pegawai")
      .then((response) => setPegawai(response.data))
      .catch((error) => console.error("Error fetching pegawai:", error));

    // Fetch leaves jika dalam mode edit
    if (id) {
      axios
        .get(`https://674ec4c5bb559617b26c95e9.mockapi.io/cuti/${id}`)
        .then((response) => {
          const data = response.data;
          setSelectedPegawai(data.pegawaiId);
          setLeaveStartDate(data.leavestartdate);
          setLeaveEndDate(data.leaveenddate);
          setReason(data.reason);
        })
        .catch((error) => console.error("Error fetching leave:", error));
    }
  }, [id]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const leaveData = {
      leavestartdate: leaveStartDate,
      leaveenddate: leaveEndDate,
      reason,
      pegawaiId: selectedPegawai,
    };

    if (id) {
      axios
        .put(`https://674ec4c5bb559617b26c95e9.mockapi.io/cuti/${id}`, leaveData)
        .then(() => {
          alert("Data cuti berhasil diperbarui!");
          navigate("/dashboard/history");
        })
        .catch((error) => console.error("Error updating leave:", error));

        
    } else {
      axios
        .post("https://674ec4c5bb559617b26c95e9.mockapi.io/cuti", leaveData)
        .then(() => {
          alert("Pengajuan cuti berhasil!");
          navigate("/dashboard/history");
        })
        .catch((error) => console.error("Error submitting leave:", error));

        
    }
  };

  return (
    <Formcontainer>
      <h2 className="text-2xl font-bold mb-10">
        {id ? "Edit Data Cuti" : "Pengajuan Cuti"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 mb-3">
          <label htmlFor="name" className="font-medium text-md ml-2">
            Pilih Pegawai
          </label>
          <select
            id="name"
            value={selectedPegawai}
            onChange={(e) => setSelectedPegawai(e.target.value)}
            className="bg-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:border-primary-600 rounded-lg w-full py-3 px-5"
          >
            <option value="" disabled>
              Pilih Nama Pegawai
            </option>
            {pegawai.map((pegawai) => (
              <option key={pegawai.id} value={pegawai.id}>
                {`${pegawai.name} ${pegawai.lastname}`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 mb-3">
          <label htmlFor="leavestartdate" className="font-medium text-md ml-2">
            Mulai Cuti
          </label>
          <input
            type="date"
            value={leaveStartDate}
            onChange={(e) => setLeaveStartDate(e.target.value)}
            className="bg-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:border-primary-600 rounded-lg w-full py-3 px-5"
          />
        </div>

        <div className="flex flex-col gap-2 mb-3">
          <label htmlFor="leaveenddate" className="font-medium text-md ml-2">
            Selesai Cuti
          </label>
          <input
            type="date"
            value={leaveEndDate}
            onChange={(e) => setLeaveEndDate(e.target.value)}
            className="bg-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:border-primary-600 rounded-lg w-full py-3 px-5"
          />
        </div>

        <div className="flex flex-col gap-2 mb-3">
          <label htmlFor="reason" className="font-medium text-md ml-2">
            Alasan
          </label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="bg-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:border-primary-600 rounded-lg w-full py-3 px-5"
          ></textarea>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}

        <button
          type="submit"
          className="bg-primary-500 w-full py-3 px-5 text-white rounded-lg mt-5 hover:bg-primary-600"
        >
          {id ? "Update Data" : "Tambahkan"}
        </button>
      </form>
    </Formcontainer>
  );
};

export default RequestLeave;
