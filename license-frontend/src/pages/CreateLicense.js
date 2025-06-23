import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const CreateLicense = () => {
  const [clientId, setClientId] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    try {
      const res = await API.post('/generate-license', { clientId, expiryDate });
      setResponse(res.data);
    } catch (err) {
      setResponse({ error: err.response?.data?.message || 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New License</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300 outline-none"
              placeholder="Enter client ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300 outline-none"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              {loading ? 'Creating...' : 'Create License'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-300 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Back
            </button>
          </div>
        </form>

        {response && (
          <div className="mt-6 p-4 border rounded-md bg-gray-50 text-sm">
            {response.error ? (
              <p className="text-red-500">{response.error}</p>
            ) : (
              <>
                <p><strong>License Key:</strong> {response.licenseKey}</p>
                <p><strong>Client ID:</strong> {response.clientId}</p>
                <p><strong>Expiry:</strong> {new Date(response.expiryDate).toLocaleDateString()}</p>
                <p><strong>HMAC:</strong> {response.hmac}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateLicense;
