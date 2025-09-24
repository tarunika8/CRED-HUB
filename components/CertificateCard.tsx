
import React from 'react';
import type { Certificate } from '../types';

interface CertificateCardProps {
  certificate: Certificate;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
      <img
        src={certificate.imageUrl}
        alt={certificate.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <p className="text-sm text-blue-400 font-semibold">{certificate.issuer}</p>
        <h3 className="font-bold text-white mt-1 truncate">{certificate.title}</h3>
        <p className="text-xs text-gray-400 mt-2">Issued: {certificate.date}</p>
        <div className="mt-4 flex justify-between items-center">
            <span className="text-xs font-semibold px-2 py-1 bg-gray-700 text-gray-300 rounded-full">{certificate.level}</span>
            <button className="text-blue-400 hover:text-blue-300 text-xs font-semibold">View Details</button>
        </div>
      </div>
    </div>
  );
};
