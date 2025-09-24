
import React, { useState } from 'react';
import type { Certificate } from '../types';

interface ImportCertificateProps {
  onClose: () => void;
  onImport: (certificate: Omit<Certificate, 'id'>) => void;
}

export const ImportCertificate: React.FC<ImportCertificateProps> = ({ onClose, onImport }) => {
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [date, setDate] = useState('');
  const [code, setCode] = useState('');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Beginner');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !issuer || !date || !code) return;
    onImport({
      title,
      issuer,
      date,
      verificationCode: code,
      level,
      relevance: 7, // Default values for mock
      reputation: 8,
      imageUrl: `https://picsum.photos/seed/${title.replace(/\s+/g, '')}/400/250`,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Import Certificate</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Certificate Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full mt-1 bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Issuer</label>
            <input type="text" value={issuer} onChange={e => setIssuer(e.target.value)} required className="w-full mt-1 bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Date Issued</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full mt-1 bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-blue-500 focus:border-blue-500"/>
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-300">Verification Code</label>
            <input type="text" value={code} onChange={e => setCode(e.target.value)} required className="w-full mt-1 bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-blue-500 focus:border-blue-500"/>
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-300">Level</label>
            <select value={level} onChange={e => setLevel(e.target.value as any)} className="w-full mt-1 bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-blue-500 focus:border-blue-500">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Expert</option>
            </select>
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-300">Upload File (Optional)</label>
            <input type="file" className="w-full mt-1 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"/>
          </div>
          <div className="flex justify-end pt-4 space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">Import</button>
          </div>
        </form>
      </div>
    </div>
  );
};
