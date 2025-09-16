import React from 'react';
import { Card, CardBody, CardFooter, Button, Divider } from "@heroui/react";
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/language-context';

interface BookingTicketProps {
  bookingId: string;
  venueName: string;
  serviceName: string;
  date: string;
  time: string;
  price: number;
  qrCode?: string;
  onClose: () => void;
}

export const BookingTicket: React.FC<BookingTicketProps> = ({
  bookingId,
  venueName,
  serviceName,
  date,
  time,
  price,
  qrCode = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=BookingID:${bookingId}&choe=UTF-8`,
  onClose
}) => {
  // Try to use the language context, but provide fallback if not available
  const languageContext = useLanguage();
  const { t } = languageContext || { t: {
    bookingConfirmed: 'การจองยืนยันแล้ว',
    date: 'วันที่',
    time: 'เวลา',
    total: 'รวม',
    bookingId: 'รหัสการจอง',
    scanQrCode: 'สแกน QR Code เพื่อยืนยันการเข้าใช้บริการ',
    downloadTicket: 'ดาวน์โหลดตั๋ว',
    done: 'เสร็จสิ้น'
  }};
  
  // Reference to the ticket card for image capture
  const ticketRef = React.useRef<HTMLDivElement>(null);
  
  // Function to download the ticket as an image
  const handleDownloadTicket = async () => {
    try {
      console.log('Starting ticket download process...');
      
      // Dynamically import html2canvas to avoid bundling it if not needed
      const html2canvasModule = await import('html2canvas');
      const html2canvas = html2canvasModule.default;
      
      // Create a temporary simple ticket for better rendering
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      tempContainer.style.width = '400px'; // Fixed width for consistency
      tempContainer.style.backgroundColor = 'white';
      
      // Create simple ticket element
      const simpleTicket = document.createElement('div');
      simpleTicket.innerHTML = `
        <div style="border: 2px dashed #3b82f6; padding: 24px; max-width: 400px; margin: 0 auto; background: white; font-family: Arial, sans-serif;">
          <div style="background: #3b82f6; color: white; padding: 12px 16px; text-align: center; margin-bottom: 16px;">
            <h2 style="font-size: 20px; font-weight: bold;">${t.bookingConfirmed}</h2>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
            <div>
              <h3 style="font-size: 18px; font-weight: 600;">${venueName}</h3>
              <p style="color: #4b5563;">${serviceName}</p>
            </div>
            <div style="background: #dbeafe; color: #2563eb; padding: 4px 12px; border-radius: 9999px; font-size: 14px; font-weight: 500;">
              #${bookingId}
            </div>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
            <div>
              <p style="font-size: 14px; color: #6b7280;">${t.date}</p>
              <p style="font-weight: 500;">${date}</p>
            </div>
            <div>
              <p style="font-size: 14px; color: #6b7280;">${t.time}</p>
              <p style="font-weight: 500;">${time}</p>
            </div>
          </div>
          
          <hr style="margin: 16px 0; border: 0; border-top: 1px solid #e5e7eb;" />
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <div>
              <p style="font-size: 14px; color: #6b7280;">${t.total}</p>
              <p style="font-size: 18px; font-weight: 600;">฿${price.toFixed(0)}</p>
            </div>
            <div style="text-align: right;">
              <p style="font-size: 14px; color: #6b7280;">${t.bookingId}</p>
              <p style="font-weight: 500;">${bookingId}</p>
            </div>
          </div>
          
          <div style="display: flex; justify-content: center; margin-bottom: 16px;">
            <img src="${qrCode}" alt="QR Code" style="width: 128px; height: 128px;" />
          </div>
          
          <p style="text-align: center; font-size: 14px; color: #6b7280;">
            ${t.scanQrCode}
          </p>
        </div>
      `;
      
      tempContainer.appendChild(simpleTicket);
      document.body.appendChild(tempContainer);
      
      // Add a small delay to ensure all images are loaded
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Capture the simple ticket element as canvas
      const canvas = await html2canvas(simpleTicket, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: false,
        foreignObjectRendering: false,
        imageTimeout: 15000,
        removeContainer: true
      });
      
      // Remove the temporary container
      document.body.removeChild(tempContainer);
      
      console.log('Canvas created successfully:', canvas);
      
      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (blob) {
          console.log('Blob created successfully, initiating download...');
          // Create download link
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `booking-ticket-${bookingId}.png`;
          document.body.appendChild(a);
          a.click();
          
          // Clean up
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          console.log('Download completed successfully');
        } else {
          console.error('Failed to create blob from canvas');
          alert('Failed to create ticket image. Please try again.');
        }
      }, 'image/png', 1.0);
    } catch (error) {
      console.error('Error downloading ticket as image:', error);
      alert('Failed to download ticket. Please check your internet connection and try again.');
    }
  };
  
  return (
    <div className="max-w-md mx-auto" ref={ticketRef}>
      <Card className="overflow-hidden border-2 border-dashed border-primary-300 dark:border-primary-700">
        <div className="bg-primary-500 text-white py-3 px-4 text-center">
          <h2 className="text-xl font-bold">{t.bookingConfirmed}</h2>
        </div>
        
        <CardBody className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-semibold">{venueName}</h3>
              <p className="text-default-600">{serviceName}</p>
            </div>
            <div className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full text-sm font-medium">
              #{bookingId}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-small text-default-500">{t.date}</p>
              <p className="font-medium">{date}</p>
            </div>
            <div>
              <p className="text-small text-default-500">{t.time}</p>
              <p className="font-medium">{time}</p>
            </div>
          </div>
          
          <Divider className="my-4" />
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-small text-default-500">{t.total}</p>
              <p className="text-lg font-semibold">฿{price.toFixed(0)}</p>
            </div>
            <div className="text-right">
              <p className="text-small text-default-500">{t.bookingId}</p>
              <p className="font-medium">{bookingId}</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <img 
              src={qrCode} 
              alt="QR Code" 
              className="w-32 h-32" 
              crossOrigin="anonymous"
            />
          </div>
          
          <p className="text-center text-small text-default-500 mt-2">
            {t.scanQrCode}
          </p>
        </CardBody>
        
        <div className="relative">
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background dark:bg-background"></div>
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background dark:bg-background"></div>
          <Divider />
        </div>
        
        <CardFooter className="flex justify-between gap-2 p-4">
          <Button 
            variant="flat" 
            color="primary" 
            startContent={<Icon icon="lucide:download" />}
            className="flex-1"
            onPress={handleDownloadTicket}
          >
            {t.downloadTicket}
          </Button>
          <Button 
            variant="solid" 
            color="primary" 
            startContent={<Icon icon="lucide:check" />}
            className="flex-1"
            onPress={onClose}
          >
            {t.done}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};