import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardFooter, Button, Divider, Chip, addToast } from "@heroui/react";
import { Icon } from '@iconify/react';
import { useLanguage } from '../../shared/contexts/language-context';
import { useAuth } from '../../shared/contexts/auth-context';
import { LoginModal } from '../../shared/components/ui/login-modal';
import { BookingTicket } from '../../shared/components/ui/booking-ticket';
import { TimeSlotSelector } from '../../shared/components/ui/time-slot-selector';
import { TableSelector } from '../../shared/components/ui/table-selector';
import { QueueSelector } from '../../shared/components/ui/queue-selector';
import { venueNamesMap } from '../../shared/data/venues';
import { 
  getServiceDetails, 
  generateTimeSlots, 
  TimeSlot, 
  getAllTables, 
  TableInfo, 
  getQueueInfo, 
  getBookingTypeLabel,
  getTableLocationLabel 
} from '../../shared/data/services';
import { Skeleton, TimeSlotSkeleton } from '../../shared/components/ui/skeleton';
import { usePageRefresh } from '../../shared/hooks/usePageRefresh';

export const ServiceBookingPage: React.FC = () => {
  const { venueId, serviceId } = useParams<{ venueId: string; serviceId: string }>();
  const history = useHistory();
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const pageKey = usePageRefresh();
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<string | null>(null);
  const [selectedTable, setSelectedTable] = React.useState<string | null>(null);
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);
  const [showTicket, setShowTicket] = React.useState(false);
  const [bookingId, setBookingId] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  
  // Force component refresh on navigation
  const componentKey = `${venueId}-${serviceId}-${pageKey}`;
  
  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  // Mock data
  const venueName = venueNamesMap[venueId!] || 'ร้านอาหารเมือง';
  const service = getServiceDetails(serviceId!);
  
  const timeSlots = generateTimeSlots();
  const tables = getAllTables(serviceId!);
  const queueInfo = getQueueInfo(serviceId!);
  
  // Get the appropriate selection label based on booking type
  const selectionLabel = getBookingTypeLabel(service.bookingType);
  
  const handleConfirmBooking = () => {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
      return;
    }
    
    // Check validation based on booking type
    if (service.bookingType === 'time_slot' && !selectedTimeSlot) {
      addToast({
        title: "กรุณาเลือกเวลา",
        description: "โปรดเลือกเวลาที่ต้องการจอง",
        color: "warning",
      });
      return;
    }
    
    if (service.bookingType === 'table_booking' && !selectedTable) {
      addToast({
        title: "กรุณาเลือกโต๊ะ",
        description: "โปรดเลือกโต๊ะที่ต้องการจอง",
        color: "warning",
      });
      return;
    }
    
    // Generate a random booking ID
    const newBookingId = `BK${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    setBookingId(newBookingId);
    
    // Show success toast
    addToast({
      title: t.bookingSuccessful,
      description: t.bookingConfirmed,
      color: "success",
    });
    
    // Show the ticket
    setShowTicket(true);
  };
  
  // Helper function to get display time/table based on booking type
  const getSelectedDisplayValue = () => {
    if (service.bookingType === 'time_slot' && selectedTimeSlot) {
      return timeSlots.find(slot => slot.id === selectedTimeSlot)?.time || '';
    }
    if (service.bookingType === 'table_booking' && selectedTable) {
      return tables.find(table => table.id === selectedTable)?.name || '';
    }
    if (service.bookingType === 'queue_only') {
      return 'เข้าคิวเลย';
    }
    return '';
  };
  
  const handleCloseTicket = () => {
    setShowTicket(false);
    // Navigate to my bookings page
    history.push('/my-bookings');
  };
  
  // If showing ticket, render the ticket component
  if (showTicket) {
    return (
      <div className="pb-20 md:pb-0 pt-8">
        <BookingTicket
          bookingId={bookingId}
          venueName={venueName}
          serviceName={service.name}
          date={new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
          time={getSelectedDisplayValue()}
          price={service.price}
          onClose={handleCloseTicket}
        />
      </div>
    );
  }
  
  return (
    <div key={componentKey} className="pb-20 md:pb-0">
      {isLoading ? (
        // Skeleton loading for service booking
        <>
          <div className="mb-6">
            <Skeleton className="h-10 w-40 mb-4" />
            <Skeleton className="h-8 w-64" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card shadow="sm">
                <CardHeader className="pb-0">
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardBody>
                  <div className="flex flex-col md:flex-row gap-4">
                    <Skeleton className="md:w-1/3 h-32 rounded-lg" />
                    <div className="md:w-2/3 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card shadow="sm">
                <CardHeader className="pb-0">
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {Array.from({ length: 18 }).map((_, index) => (
                      <TimeSlotSkeleton key={index} />
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-6 mt-6">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </CardBody>
              </Card>
            </div>
            
            <div>
              <Card shadow="sm" className="sticky top-4">
                <CardHeader className="pb-0">
                  <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardBody className="py-4">
                  <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="space-y-1">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-5 w-32" />
                      </div>
                    ))}
                    <Divider />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-5 w-12" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </div>
                </CardBody>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <>
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="light"
          isIconOnly
          startContent={<Icon icon="lucide:arrow-left" width={20} height={20} />}
          onPress={() => history.goBack()}
          className="text-default-600 hover:text-default-900 transition-colors min-w-unit-10 w-10 h-10"
          aria-label={t.back}
        />
        <div>
          <div className="flex items-center gap-2 text-small text-default-500">
            <span>{venueName}</span>
            <Icon icon="lucide:chevron-right" width={16} height={16} />
            <span>{service.name}</span>
          </div>
          {/* <h1 className="text-2xl font-bold">{t.bookingDetails}</h1> */}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card shadow="sm" className="mb-6">
            {/* <CardHeader className="pb-0">
              <h2 className="text-xl font-semibold">{t.selectService}</h2>
            </CardHeader> */}
            <CardBody>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                  <p className="text-default-600 mb-4">{service.description}</p>
                  
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-1">
                      <Icon icon="lucide:clock" className="text-primary-500" />
                      <span>{service.duration} {t.minutes}</span>
                    </div>
                    <div className="font-semibold text-lg text-primary-600 dark:text-primary-400">
                      ฿{service.price.toFixed(0)}
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          
          <Card shadow="sm">
            <CardHeader className="pb-0">
              <h2 className="text-xl font-semibold">{selectionLabel}</h2>
            </CardHeader>
            <CardBody>
              {service.bookingType === 'time_slot' && (
                <TimeSlotSelector
                  timeSlots={timeSlots}
                  selectedTimeSlot={selectedTimeSlot}
                  onTimeSlotSelect={setSelectedTimeSlot}
                />
              )}
              
              {service.bookingType === 'table_booking' && (
                <TableSelector
                  tables={tables}
                  selectedTable={selectedTable}
                  onTableSelect={setSelectedTable}
                />
              )}
              
              {service.bookingType === 'queue_only' && (
                <QueueSelector queueInfo={queueInfo} />
              )}
            </CardBody>
          </Card>
        </div>
        
        <div>
          <Card shadow="sm" className="sticky top-4">
            <CardHeader className="pb-0">
              <h2 className="text-xl font-semibold">{t.bookingConfirmation}</h2>
            </CardHeader>
            <CardBody className="py-4">
              <div className="space-y-4">
                <div>
                  <p className="text-small text-default-500">{t.venue}</p>
                  <p className="font-medium">{venueName}</p>
                </div>
                
                <div>
                  <p className="text-small text-default-500">{t.service}</p>
                  <p className="font-medium">{service.name}</p>
                </div>
                
                {(selectedTimeSlot || selectedTable || service.bookingType === 'queue_only') && (
                  <div>
                    <p className="text-small text-default-500">
                      {service.bookingType === 'time_slot' ? t.time :
                       service.bookingType === 'table_booking' ? 'โต๊ะ' :
                       'การจอง'}
                    </p>
                    <p className="font-medium">
                      {getSelectedDisplayValue()}
                    </p>
                  </div>
                )}
                
                <div>
                  <p className="text-small text-default-500">{t.duration}</p>
                  <p className="font-medium">{service.duration} {t.minutes}</p>
                </div>
                
                <Divider />
                
                <div className="flex justify-between items-center">
                  <p className="text-default-700">{t.total}</p>
                  <p className="font-semibold text-lg">฿{service.price.toFixed(0)}</p>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <Button
                color="primary"
                className="w-full"
                onPress={handleConfirmBooking}
                isDisabled={service.bookingType === 'time_slot' && !selectedTimeSlot ||
                           service.bookingType === 'table_booking' && !selectedTable ||
                           service.bookingType === 'queue_only' && queueInfo && !queueInfo.isOpen}
              >
                {service.bookingType === 'queue_only' ? t.joinQueue : t.bookNow}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
        </>
      )}
      
      <LoginModal 
        isOpen={loginModalOpen} 
        onOpenChange={setLoginModalOpen} 
        onSuccess={handleConfirmBooking}
      />
    </div>
  );
};