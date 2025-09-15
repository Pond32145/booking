import React from 'react';
import { Card, CardBody, CardFooter, Button, Chip, Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { Icon } from '@iconify/react';
import { BookingTicket } from './booking-ticket';
import { getBookingById } from '../../data/bookings';

type BookingStatus = 'confirmed' | 'pending' | 'canceled';

interface BookingHistoryCardProps {
  id: string;
  serviceName: string;
  providerName: string;
  date: string;
  time: string;
  location: string;
  status: BookingStatus;
  image: string;
  onReschedule: (id: string) => void;
  onCancel: (id: string) => void;
}

export const BookingHistoryCard: React.FC<BookingHistoryCardProps> = ({
  id,
  serviceName,
  providerName,
  date,
  time,
  location,
  status,
  image,
  onReschedule,
  onCancel
}) => {
  const [showTicket, setShowTicket] = React.useState(false);
  const [bookingData, setBookingData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  
  const statusConfig = {
    confirmed: { color: 'success', icon: 'lucide:check-circle', label: 'ยืนยันแล้ว' },
    pending: { color: 'warning', icon: 'lucide:clock', label: 'รอดำเนินการ' },
    canceled: { color: 'danger', icon: 'lucide:x-circle', label: 'ยกเลิกแล้ว' }
  };

  const config = statusConfig[status];

  const handleViewTicket = async () => {
    setLoading(true);
    try {
      const data = await getBookingById(id);
      if (data) {
        setBookingData(data);
        setShowTicket(true);
      }
    } catch (error) {
      console.error('Failed to fetch booking data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card shadow="sm" className="w-full professional-card overflow-hidden">
        <CardBody className="p-0">
          <div className="flex">
            <img
              src={image}
              alt={serviceName}
              className="w-28 h-28 object-cover"
            />
            <div className="p-4 flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-medium">{serviceName}</h3>
                <Chip
                  color={config.color as any}
                  variant="flat"
                  size="sm"
                  startContent={<Icon icon={config.icon} width={14} height={14} />}
                  className="shadow-sm"
                >
                  {config.label}
                </Chip>
              </div>
              <p className="text-small text-slate-600 dark:text-slate-400 mt-1">{providerName}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-tiny">
                  <Icon icon="lucide:calendar" width={12} height={12} />
                  <span>{date}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-tiny">
                  <Icon icon="lucide:clock" width={12} height={12} />
                  <span>{time}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-tiny">
                  <Icon icon="lucide:map-pin" width={12} height={12} />
                  <span>{location}</span>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
        {status !== 'canceled' && (
          <CardFooter className="flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800 py-2">
            {status === 'confirmed' && (
              <>
                <Button
                  size="sm"
                  variant="flat"
                  color="primary"
                  onPress={handleViewTicket}
                  isLoading={loading}
                  className="font-medium"
                >
                  ดูตั๋ว
                </Button>
                <Button
                  size="sm"
                  variant="flat"
                  color="primary"
                  onPress={() => onReschedule(id)}
                  className="font-medium"
                >
                  เลื่อนการจอง
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant="flat"
              color="danger"
              onPress={() => onCancel(id)}
              className="font-medium"
            >
              ยกเลิก
            </Button>
          </CardFooter>
        )}
        {status === 'canceled' && (
          <CardFooter className="flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800 py-2">
            <Button
              size="sm"
              variant="flat"
              color="primary"
              onPress={handleViewTicket}
              isLoading={loading}
              className="font-medium"
            >
              ดูตั๋ว
            </Button>
          </CardFooter>
        )}
      </Card>

      <Modal 
        isOpen={showTicket} 
        onOpenChange={setShowTicket}
        size="md"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            ตั๋วการจอง
            <p className="text-small text-default-500">#{id}</p>
          </ModalHeader>
          <ModalBody className="p-0">
            <div className="p-1">
              {bookingData && (
                <BookingTicket
                  bookingId={bookingData.id}
                  venueName={bookingData.providerName}
                  serviceName={bookingData.serviceName}
                  date={bookingData.date}
                  time={bookingData.time}
                  price={0} // This would come from actual booking data
                  onClose={() => setShowTicket(false)}
                />
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};