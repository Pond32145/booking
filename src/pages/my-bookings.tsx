import React from 'react';
import { useHistory } from 'react-router-dom';
import { Tabs, Tab, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Pagination, useDisclosure, addToast } from "@heroui/react";
import { Icon } from '@iconify/react';
import { BookingHistoryCard } from '../components/booking-history-card';
import { BookingCardSkeleton } from '../components/skeleton';
import { useLanguage } from '../contexts/language-context';
import { getUpcomingBookings, getPastBookings, cancelBooking } from '../data/bookings';

export const MyBookingsPage: React.FC = () => {
  const history = useHistory();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedBookingId, setSelectedBookingId] = React.useState<string | null>(null);
  const [cancelReason, setCancelReason] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [upcomingBookingsData, setUpcomingBookingsData] = React.useState([]);
  const [pastBookingsData, setPastBookingsData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const { t } = useLanguage();
  
  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  React.useEffect(() => {
    const fetchBookings = async () => {
      const upcoming = await getUpcomingBookings();
      const past = await getPastBookings();
      setUpcomingBookingsData(upcoming);
      setPastBookingsData(past);
    };
    fetchBookings();
  }, []);
  
  const handleReschedule = (id: string) => {
    addToast({
      title: t.rescheduleRequestSent,
      description: t.rescheduleOptions,
      color: "primary",
    });
  };
  
  const handleCancel = (id: string) => {
    setSelectedBookingId(id);
    onOpen();
  };
  
  const confirmCancellation = async () => {
    if (selectedBookingId) {
      await cancelBooking(selectedBookingId, cancelReason);
      addToast({
        title: t.bookingCanceled,
        description: t.bookingCanceledSuccess,
        color: "success",
      });
      onOpenChange();
      setSelectedBookingId(null);
      setCancelReason('');
    }
  };
  
  return (
    <div className="pb-20 md:pb-0">
      <div className="flex items-center gap-4 mb-4">
        <Button
          variant="light"
          isIconOnly
          startContent={<Icon icon="lucide:arrow-left" width={20} height={20} />}
          onPress={() => history.goBack()}
          className="text-default-600 hover:text-default-900 transition-colors min-w-unit-10 w-10 h-10"
          aria-label={t.back}
        />
        <h1 className="text-2xl font-bold">การจองของฉัน</h1> {/* Changed to Thai */}
      </div>
      
      <Tabs aria-label="Booking history" color="primary" variant="underlined">
        <Tab
          key="upcoming"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:calendar" width={18} height={18} />
              <span>ที่จะถึง</span> {/* Changed to Thai */}
            </div>
          }
        >
          <div className="mt-4 space-y-4">
            {isLoading ? (
              Array.from({ length: 2 }).map((_, index) => (
                <BookingCardSkeleton key={index} />
              ))
            ) : upcomingBookingsData.length > 0 ? (
              upcomingBookingsData.map((booking) => (
                <div
                  key={booking.id}
                >
                  <BookingHistoryCard
                    {...booking}
                    onReschedule={handleReschedule}
                    onCancel={handleCancel}
                  />
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <Icon icon="lucide:calendar-x" className="w-12 h-12 mx-auto text-default-300" />
                <p className="mt-2 text-default-500">ไม่มีการจองที่กำลังจะถึง</p> {/* Changed to Thai */}
                <Button color="primary" variant="flat" className="mt-4">
                  จองเลย {/* Changed to Thai */}
                </Button>
              </div>
            )}
          </div>
        </Tab>
        <Tab
          key="past"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:clock" width={18} height={18} />
              <span>ที่ผ่านมา</span> {/* Changed to Thai */}
            </div>
          }
        >
          <div className="mt-4 space-y-4">
            {isLoading ? (
              Array.from({ length: 2 }).map((_, index) => (
                <BookingCardSkeleton key={index} />
              ))
            ) : (
              pastBookingsData.map((booking) => (
                <div
                  key={booking.id}
                >
                  <BookingHistoryCard
                    {...booking}
                    onReschedule={handleReschedule}
                    onCancel={handleCancel}
                  />
                </div>
              ))
            )}
          </div>
        </Tab>
        <Tab
          key="canceled"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:x-circle" width={18} height={18} />
              <span>ยกเลิกแล้ว</span> {/* Changed to Thai */}
            </div>
          }
        >
          <div className="mt-4 p-8 text-center">
            <Icon icon="lucide:check-circle" className="w-12 h-12 mx-auto text-default-300" />
            <p className="mt-2 text-default-500">ไม่มีการจองที่ยกเลิก</p> {/* Changed to Thai */}
          </div>
        </Tab>
      </Tabs>
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">ยกเลิกการจอง</ModalHeader> {/* Changed to Thai */}
              <ModalBody>
                <p>คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการจองนี้? การกระทำนี้ไม่สามารถย้อนกลับได้</p> {/* Changed to Thai */}
                <div className="mt-4">
                  <label className="block text-small font-medium mb-1">เหตุผลในการยกเลิก (ไม่บังคับ)</label> {/* Changed to Thai */}
                  <textarea 
                    className="w-full p-2 border border-default-200 rounded-medium text-small"
                    rows={3}
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="โปรดบอกเราว่าทำไมคุณถึงยกเลิก..." // Changed to Thai
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  คงการจองไว้ {/* Changed to Thai */}
                </Button>
                <Button color="danger" onPress={confirmCancellation}>
                  ยกเลิกการจอง {/* Changed to Thai */}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};