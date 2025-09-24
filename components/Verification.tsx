
import React, { useState } from 'react';

enum VerificationStatus {
  Idle,
  Verifying,
  Success,
  Failed
}

const mockVerificationData = {
    'UC-ABC-123': {
        title: 'React - The Complete Guide',
        issuer: 'Udemy',
        date: '2023-10-15',
        status: 'Valid',
        holder: 'Alex Doe'
    },
    'COUR-XYZ-789': {
        title: 'Google Project Management',
        issuer: 'Coursera',
        date: '2023-08-20',
        status: 'Valid',
        holder: 'Alex Doe'
    }
}

export const Verification: React.FC = () => {
    const [code, setCode] = useState('');
    const [status, setStatus] = useState<VerificationStatus>(VerificationStatus.Idle);
    const [result, setResult] = useState<any>(null);

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(VerificationStatus.Verifying);
        setResult(null);

        setTimeout(() => {
            const verificationResult = mockVerificationData[code as keyof typeof mockVerificationData];
            if (verificationResult) {
                setStatus(VerificationStatus.Success);
                setResult(verificationResult);
            } else {
                setStatus(VerificationStatus.Failed);
            }
        }, 1500);
    }
  
  return (
    <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center">
            <div className="mx-auto bg-blue-600/20 h-16 w-16 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mt-4">Certificate Verification</h2>
            <p className="text-gray-400 mt-2">Enter the unique code from a certificate to verify its authenticity with the issuer.</p>
            
            <form onSubmit={handleVerify} className="mt-6 flex flex-col sm:flex-row gap-2">
                <input 
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g., UC-ABC-123"
                    className="flex-grow bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                />
                <button 
                    type="submit"
                    disabled={status === VerificationStatus.Verifying}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-800 disabled:cursor-not-allowed"
                >
                     {status === VerificationStatus.Verifying ? 'Verifying...' : 'Verify'}
                </button>
            </form>
        </div>

        <div className="mt-8">
            {status === VerificationStatus.Verifying && <p className="text-center text-gray-400">Contacting issuer... Please wait.</p>}
            {status === VerificationStatus.Success && result && (
                <div className="bg-green-900/50 border border-green-500 text-green-300 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white">Verification Successful</h3>
                    <div className="mt-4 space-y-2 text-sm">
                        <p><strong>Title:</strong> {result.title}</p>
                        <p><strong>Issuer:</strong> {result.issuer}</p>
                        <p><strong>Issued On:</strong> {result.date}</p>
                        <p><strong>Holder:</strong> {result.holder}</p>
                        <p><strong>Status:</strong> <span className="font-bold text-green-400">{result.status}</span></p>
                    </div>
                </div>
            )}
            {status === VerificationStatus.Failed && (
                 <div className="bg-red-900/50 border border-red-500 text-red-300 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white">Verification Failed</h3>
                    <p className="mt-2 text-sm">The code you entered is not valid or could not be found. Please check the code and try again.</p>
                </div>
            )}
        </div>
    </div>
  );
};
