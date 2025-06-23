import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [licenses, setLicenses] = useState([]);

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const res = await API.get('/all-licenses');
        setLicenses(res.data);
      } catch (err) {
        console.error('❌ Error fetching licenses: ', err);
      }
    };

    fetchLicenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">License Dashboard</h1>
          <Link
            to="/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition"
          >
            + New License
          </Link>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">License Key</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">Client ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {licenses.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-gray-400">
                    No licenses available.
                  </td>
                </tr>
              ) : (
                licenses.map((lic, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-mono text-xs break-all border-r">{lic.licenseKey}</td>
                    <td className="px-6 py-4 border-r">{lic.clientId}</td>
                    <td className="px-6 py-4 border-r">{new Date(lic.expiryDate).toLocaleDateString()}</td>
                    <td
                      className={`px-6 py-4 font-semibold ${
                        lic.status === 'active'
                          ? 'text-green-600'
                          : lic.status === 'expired'
                          ? 'text-red-500'
                          : 'text-yellow-500'
                      }`}
                    >
                      {lic.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
