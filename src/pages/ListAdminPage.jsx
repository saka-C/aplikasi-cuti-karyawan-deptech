import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ListAdminPage = () => {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    axios
      .get("https://674f3ee7bb559617b26e9702.mockapi.io/admin")
      .then((response) => {
        setAdmin(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Fungsi untuk menghapus data admin
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://674f3ee7bb559617b26e9702.mockapi.io/admin/${id}`);

      // Update state admin untuk menghapus data di tabel
      setAdmin((prev) => prev.filter((item) => item.id !== id));
      alert("Data berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Terjadi kesalahan saat menghapus data!");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-5xl font-poppins font-semibold mb-10">Data Admin</h1>

      <div className="overflow-x-auto border-2 border-gray-100 sm:rounded-lg">
        <div className="flex justify-between items-center p-5">
          <h3 className="text-2xl font-semibold">List Admin</h3>
          <Link
            to="/dashboard/add-admin"
            className="bg-primary-500 py-3 px-5 rounded-md hover:bg-primary-600 text-white flex items-center gap-1 font-medium"
          >
            <box-icon name='plus-circle' color="white"></box-icon>Tambah Admin
          </Link>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Tanggal Lahir
              </th>
              <th scope="col" className="px-6 py-3">
                Jenis Kelamin
              </th>
              <th scope="col" className="px-6 py-3">
                Password
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {admin.map((admin, index) => (
              <tr key={admin.id} className="bg-white border-b hover:bg-gray-50">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">
                  {admin.name} {admin.lastname}
                </td>
                <td className="px-6 py-4">{admin.email}</td>
                <td className="px-6 py-4">{admin.birth}</td>
                <td className="px-6 py-4">{admin.gender}</td>
                <td className="px-6 py-4">{admin.password}</td>
                <td className="px-6 py-4 flex space-x-3">
                  <Link
                    to={`/dashboard/view-admin/${admin.id}`}
                    className="font-medium text-xl hover:underline text-primary-500 hover:text-primary-600"
                  >
                    <i className="bx bx-show-alt"></i>
                  </Link>
                  <button
                    onClick={() => handleDelete(admin.id)}
                    className="text-red-500 hover:text-red-700 text-xl"
                  >
                    <i className="bx bx-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListAdminPage;
