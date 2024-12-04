import React, { useState } from "react";
import Formcontainer from "../components/Formcontainer";
import { useNavigate } from "react-router-dom";

const AddPegawai = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      lastname: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      address: formData.address,
    };

    try {
      const response = await fetch("https://674ec4c5bb559617b26c95e9.mockapi.io/pegawai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Pegawai berhasil ditambahkan!");
        console.log(result);
        setFormData({
          name: "",
          lastName: "",
          email: "",
          phone: "",
          gender: "",
          address: "",
        });

        navigate("/dashboard/pegawai");
      } else {
        alert("Gagal menambahkan Pegawai. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <Formcontainer>
      <h2 className="text-2xl font-bold mb-10">Tambah Data Pegawai</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 mb-3">
          <label htmlFor="name" className="font-medium text-md ml-2">Nama Depan</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John"
            className="bg-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:border-primary-600 rounded-lg w-full py-3 px-5"
          />
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <label htmlFor="lastName" className="font-medium text-md ml-2">Nama Belakang</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
            className="bg-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:border-primary-600 rounded-lg w-full py-3 px-5"
          />
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <label htmlFor="email" className="font-medium text-md ml-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            className="bg-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:border-primary-600 rounded-lg w-full py-3 px-5"
          />
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <label htmlFor="phone" className="font-medium text-md ml-2">No.Telp</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="bg-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:border-primary-600 rounded-lg w-full py-3 px-5"
          />
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <label htmlFor="gender" className="font-medium text-md ml-2">Jenis Kelamin</label>
          <div className="flex items-center gap-5 ml-2">
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              onChange={handleChange}
              checked={formData.gender === "male"}
            />
            <label htmlFor="male" className="text-base font-medium">Laki - Laki</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={handleChange}
              checked={formData.gender === "female"}
            />
            <label htmlFor="female" className="text-base font-medium">Perempuan</label>
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <label htmlFor="address" className="font-medium text-md ml-2">Alamat</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="bg-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:border-primary-600 rounded-lg w-full py-3 px-5"
          />
        </div>
        <button
          type="submit"
          className="bg-primary-500 w-full py-3 px-5 text-white rounded-lg mt-5 hover:bg-primary-600"
        >
          Tambahkan
        </button>
      </form>
    </Formcontainer>
  );
};

export default AddPegawai;
