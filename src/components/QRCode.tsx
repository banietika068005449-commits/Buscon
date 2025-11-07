import React from 'react';
import { QrCode } from 'lucide-react';

const QRCode: React.FC = () => {
  return (
    <div className="bg-white p-2 rounded-md shadow-inner">
      <QrCode className="w-full h-full text-slate-800" />
    </div>
  );
};

export default QRCode;
