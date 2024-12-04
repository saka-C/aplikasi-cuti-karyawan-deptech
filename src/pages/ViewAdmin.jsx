import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Formcontainer from "../components/Formcontainer";

const ViewAdmin = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      const response = await fetch(`https://674f3ee7bb559617b26e9702.mockapi.io/admin/${id}`);
      const data = await response.json();
      setAdmin(data); 
    };

    fetchAdmin();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedAdmin = {
      name: e.target.name.value,
      lastname: e.target.lastname.value,
      email: e.target.email.value,
      birth: e.target.birth.value,
      gender: e.target.gender.value,
      password: e.target.password.value,
    };

    fetch(`https://674f3ee7bb559617b26e9702.mockapi.io/admin/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedAdmin),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/dashboard/admin");
      })
      .catch((error) => console.error("Error updating Admin:", error));
  };

  if (!admin) return <div>Loading...</div>;

  return (
    <>
        <Formcontainer>
        <h2 className="text-2xl font-bold mb-10">Profil Admin</h2>
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="name" className="font-medium text-md ml-2">
                Nama Depan
            </label>
            <input
                type="text"
                name="name"
                defaultValue={admin.name}
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
                defaultValue={admin.lastname}
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
                defaultValue={admin.email}
                className="bg-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:border-primary-600 rounded-lg w-full py-3 px-5"
            />
            </div>
            <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="phone" className="font-medium text-md ml-2">
                No.Telp
            </label>
            <input
                type="text"
                name="birth"
                defaultValue={admin.birth}
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
                checked={admin.gender === "male"}
                />
                <label htmlFor="male" className="text-base font-medium">
                Laki - Laki
                </label>
                <input
                type="radio"
                name="gender"
                value="female"
                checked={admin.gender === "female"}
                />
                <label htmlFor="female" className="text-base font-medium">
                Perempuan
                </label>
            </div>
            </div>
            <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="address" className="font-medium text-md ml-2">
                Password
            </label>
            <input
                type="text"
                name="password"
                defaultValue={admin.password}
                className="bg-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:border-primary-600 rounded-lg w-full py-3 px-5"
            />
            </div>
            <button className="bg-primary-500 w-full py-3 px-5 text-white rounded-lg mt-5 hover:bg-primary-600">
            Perbarui
            </button>
        </form>
        </Formcontainer>
    </>
  );
};

export default ViewAdmin;
