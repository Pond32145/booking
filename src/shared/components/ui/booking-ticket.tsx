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
  qrCode = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=BookingConfirmed",
  onClose
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="max-w-md mx-auto">
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
            <img src={qrCode} alt="QR Code" className="w-32 h-32" />
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