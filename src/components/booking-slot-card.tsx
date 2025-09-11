import React from 'react';
import { Card, CardBody, Button, Chip, Divider } from "@heroui/react";
import { Icon } from '@iconify/react';
import { MotionDiv } from '../components/motion';
import { useAuth } from '../contexts/auth-context';
import { LoginModal } from './login-modal';
import { useLanguage } from '../contexts/language-context';

interface BookingSlotProps {
  id: string;
  name: string;
  location: string;
  date: string;
  time: string;
  price: number;
  rating: number;
  image: string;
  available: boolean;
  distance?: number; // Distance in kilometers
  isOpen?: boolean; // Opening status
  openingHours?: string; // Opening hours
  onBook: (id: string) => void;
  hideDetails?: boolean; // New prop to hide date/time/price
}

export const BookingSlotCard: React.FC<BookingSlotProps> = ({
  id,
  name,
  location,
  date,
  time,
  price,
  rating,
  image,
  available,
  distance,
  isOpen,
  openingHours,
  onBook,
  hideDetails = false // Default to showing details
}) => {
  const [isBookingLoading, setIsBookingLoading] = React.useState(false);
  const { t } = useLanguage();

  const handleBookClick = async () => {
    setIsBookingLoading(true);
    try {
      await onBook(id);
    } finally {
      setIsBookingLoading(false);
    }
  };

  // Default values for new properties
  const displayDistance = distance !== undefined ? distance : Math.floor(Math.random() * 10) + 1;
  const displayIsOpen = isOpen !== undefined ? isOpen : Math.random() > 0.5;
  const displayOpeningHours = openingHours || '10:00 - 22:00 น.';

  return (
    <MotionDiv
      whileHover={{
        y: -2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card
        shadow="sm"
        className="w-full bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors duration-200 overflow-hidden"
        role="article"
        aria-label={`${name} booking slot at ${location}`}
        onPress={handleBookClick}
        isPressable
      >
        <div className="flex flex-col ">
          {/* Image - Larger on desktop */}
          <MotionDiv
            className="w-full  h-48 md:h-auto flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={image}
              alt={`${name} venue image`}
              className="object-cover w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
              loading="lazy"
            />
          </MotionDiv>

          {/* Content */}
          <div className="flex flex-col justify-between w-full">
            <CardBody className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <MotionDiv
                    className="text-lg font-bold tracking-tight text-gray-900 dark:text-white mb-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {name}
                  </MotionDiv>
                  <div className="  items-center  gap-1 text-default-600 dark:text-default-400">
                    <div className='flex items-center gap-1 mt-1'>
                      <Icon icon="lucide:map-pin" width={14} height={14} />
                      <span className="text-xs"> {displayDistance} กม.</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-1">
                  <div className="relative">
                    <div className={`w-2 h-2 rounded-full ${displayIsOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div className={`absolute inset-0 w-2 h-2 rounded-full ${displayIsOpen ? 'bg-green-500 animate-ping' : 'bg-red-500'}`}></div>
                  </div>
                  <span className="text-xs font-medium">
                    {displayIsOpen ? 'เปิดอยู่' : 'ปิดแล้ว'}
                  </span>
                </div>
              </div>



              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="  items-center  gap-1 text-default-600 dark:text-default-400">
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-default-500">
                       เวลาให้บริการ {displayOpeningHours}
                      </span>
                    </div>

                  </div>
                </div>

                {/* <MotionDiv
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button
                    color="primary"
                    size="md"
                    onPress={handleBookClick}
                    isDisabled={!available}
                    isLoading={isBookingLoading}
                    className="font-medium px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-sm transition-colors duration-200 text-sm min-w-[100px]"
                    aria-label={available ? `Book ${name} now` : `${name} is unavailable`}
                  >
                    {isBookingLoading ? (
                      <>
                        <Icon icon="lucide:loader-2" className="animate-spin mr-2" width={16} height={16} />
                        {t.bookNow}
                      </>
                    ) : (
                      available ? t.bookNow : t.unavailable
                    )}
                  </Button>
                </MotionDiv> */}
              </div>
            </CardBody>
          </div>
        </div>
      </Card>
    </MotionDiv>
  );
};