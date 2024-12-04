import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Formcontainer from "../components/Formcontainer";

const ViewPegawai = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [pegawai, setPegawai] = useState(null);
  const [leave, setLeave] = useState();

  useEffect(() => {
    const fetchPegawai = async () => {
      const response = await fetch(`https://674ec4c5bb559617b26c95e9.mockapi.io/pegawai/${id}`);
      const data = await response.json();
      setPegawai(data); 
    };

    const fetchLeave = async () => {
      const response = await fetch(`https://674ec4c5bb559617b26c95e9.mockapi.io/cuti`);
      let data = await response.json();
      data = data.filter(item => item.pegawaiId === id);
      setLeave(data); 
    };

    fetchLeave();
    fetchPegawai();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPegawai = {
      name: e.target.name.value,
      lastname: e.target.lastname.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      gender: e.target.gender.value,
      address: e.target.address.value,
    };

    // Update pegawai (misalnya melalui API)
    fetch(`https://674ec4c5bb559617b26c95e9.mockapi.io/pegawai/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedPegawai),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/dashboard/pegawai");
      })
      .catch((error) => console.error("Error updating pegawai:", error));
  };

  if (!pegawai) return <div>Loading...</div>;

  return (
    <>
        <Formcontainer>
        <h2 className="text-2xl font-bold mb-10">Profil Pegawai</h2>
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="name" className="font-medium text-md ml-2">
                Nama Depan
            </label>
            <input
                type="text"
                name="name"
                defaultValue={pegawai.name}
                className="bg-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:border-primary-600 rounded-lg w-full py-3 px-5"
            />
            </div>
            <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="lastname" className="font-medium text-md ml-2">
                Nama Belakang
            </label>
            <input
                type="text"
                name="lastname"
                defaultValue={pegawai.lastname}
                className="bg-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:border-primary-600 rounded-lg w-full py-3 px-5"
            />
            </div>
            <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="email" className="font-medium text-md ml-2">
                Email
            </label>
            <input
                type="email"
                name="email"
                defaultValue={pegawai.email}
                className="bg-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:border-primary-600 rounded-lg w-full py-3 px-5"
            />
            </div>
            <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="phone" className="font-medium text-md ml-2">
                No.Telp
            </label>
            <input
                type="text"
                name="phone"
                defaultValue={pegawai.phone}
                className="bg-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:border-primary-600 rounded-lg w-full py-3 px-5"
            />
            </div>
            <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="gender" className="font-medium text-md ml-2">
                Jenis Kelamin
            </label>
            <div className="flex items-center gap-5 ml-2">
                <input
                type="radio"
                name="gender"
                value="male"
                checked={pegawai.gender === "male"}
                />
                <label htmlFor="male" className="text-base font-medium">
                Laki - Laki
                </label>
                <input
                type="radio"
                name="gender"
                value="female"
                checked={pegawai.gender === "female"}
                />
                <label htmlFor="female" className="text-base font-medium">
                Perempuan
                </label>
            </div>
            </div>
            <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="address" className="font-medium text-md ml-2">
                Alamat
            </label>
            <input
                type="text"
                name="address"
                defaultValue={pegawai.address}
                className="bg-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:border-primary-600 rounded-lg w-full py-3 px-5"
            />
            </div>
            <button className="bg-primary-500 w-full py-3 px-5 text-white rounded-lg mt-5 hover:bg-primary-600">
            Perbarui
            </button>
        </form>
        </Formcontainer>
        <div class="overflow-x-auto border-2 border-gray-100 sm:rounded-lg mt-10">
          <div className="flex justify-between items-center p-5">
            <h3 className="text-2xl font-semibold">History Cuti {pegawai.name}</h3>
          </div>
          <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">
                  No.
                </th>
                <th scope="col" class="px-6 py-3">
                  Tanggal Mulai
                </th>
                <th scope="col" class="px-6 py-3">
                  tanggal selesai
                </th>
                <th scope="col" class="px-6 py-3">
                  alasan
                </th>
              </tr>
            </thead>
            <tbody>
            {leave && leave.length > 0 ? (
              leave.map((leave, index) => (
                <tr key={leave.id} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{leave.leavestartdate}</td>
                  <td className="px-6 py-4">{leave.leaveenddate}</td>
                  <td className="px-6 py-4">{leave.reason}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center">Tidak ada data cuti untuk pegawai ini.</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
    </>
  );
};

export default ViewPegawai;
