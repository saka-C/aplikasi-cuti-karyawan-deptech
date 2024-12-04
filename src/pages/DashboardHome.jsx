import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const [pegawaiCount, setPegawaiCount] = useState(0);  
  const [adminCount, setAdminCount] = useState(0);      

  const fetchData = async () => {
    try {
      const pegawaiResponse = await fetch("https://674ec4c5bb559617b26c95e9.mockapi.io/pegawai");
      const pegawaiData = await pegawaiResponse.json();
      setPegawaiCount(pegawaiData.length); 

      const adminResponse = await fetch("https://674f3ee7bb559617b26e9702.mockapi.io/admin");
      const adminData = await adminResponse.json();
      setAdminCount(adminData.length);  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [leave, setLeave] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leaveResponse, pegawaiResponse] = await Promise.all([
          axios.get("https://674ec4c5bb559617b26c95e9.mockapi.io/cuti"), 
          axios.get("https://674ec4c5bb559617b26c95e9.mockapi.io/pegawai"), 
        ]);

        const leaveData = leaveResponse.data;
        const pegawaiData = pegawaiResponse.data;

        const mergedData = leaveData.map((leaveItem) => {
          const pegawaiItem = pegawaiData.find(
            (pegawai) => pegawai.id === leaveItem.pegawaiId
          );
          return {
            ...leaveItem, 
            name: pegawaiItem?.name || "Unknown",
            lastname: pegawaiItem?.lastname || "",
          };
        });

        setLeave(mergedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-5xl font-poppins font-semibold">Dashboard</h1>

      <div className="flex gap-5 my-5">
        <div className="w-full h-36 flex flex-col justify-center bg-slate-100 shadow-md shadow-primary-100 rounded-md p-5">
          <h1 className="text-4xl font-semibold mb-3">{pegawaiCount}</h1>
          <div className="flex items-center justify-between">
            <span>Jumlah Pegawai</span>
            <Link to="/dashboard/add-pegawai"><box-icon name='plus-circle' size="md" color="rgb(59 130 246 / var(--tw-bg-opacity, 1))"></box-icon></Link>
          </div>
        </div>
        <div className="w-full h-36 flex flex-col justify-center bg-slate-100 shadow-md shadow-primary-100 rounded-md p-5">
          <h1 className="text-4xl font-semibold mb-3">{adminCount}</h1>
          <div className="flex items-center justify-between">
            <span>Jumlah Admin</span>
            <Link to="/dashboard/add-admin"><box-icon name='plus-circle' size="md" color="rgb(59 130 246 / var(--tw-bg-opacity, 1))"></box-icon></Link>
          </div>
        </div>
      </div>

      <div className="p-4">
      <div className="overflow-x-auto border-2 border-gray-100 sm:rounded-lg">
        <div className="flex justify-between items-center p-5">
          <h3 className="text-2xl font-semibold">List Cuti</h3>
          <Link
            to="/dashboard/requestleave"
            className="bg-primary-500 py-3 px-5 rounded-md hover:bg-primary-600 text-white flex items-center gap-1 font-medium"
          >
            <box-icon name='plus-circle' color="white"></box-icon>Tambah Cuti
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
                tanggal mulai
              </th>
              <th scope="col" className="px-6 py-3">
                tanggal selesai
              </th>
              <th scope="col" className="px-6 py-3">
                alasan
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {leave.map((leaveItem, index) => (
              <tr
                key={leaveItem.id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">
                  {leaveItem.name} {leaveItem.lastname}
                </td>
                <td className="px-6 py-4">{leaveItem.leavestartdate}</td>
                <td className="px-6 py-4">{leaveItem.leaveenddate}</td>
                <td className="px-6 py-4">{leaveItem.reason}</td>
                <td className="px-6 py-4 flex space-x-3">
                  <Link
                    to={`/dashboard/request-leave/${leaveItem.id}`}
                    className="font-medium text-xl hover:underline text-primary-500 hover:text-primary-600"
                  >
                    <i className="bx bx-show-alt"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default DashboardHome;
