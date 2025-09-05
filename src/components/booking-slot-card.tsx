import React from 'react';
import { Card, CardBody, CardFooter, Button, Chip } from "@heroui/react";
import { Icon } from '@iconify/react';
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
  onBook,
  hideDetails = false // Default to showing details
}) => {
  const { isAuthenticated } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);
  const [isBookingLoading, setIsBookingLoading] = React.useState(false);
  const { t } = useLanguage();

  const handleBookClick = async () => {
    if (isAuthenticated) {
      setIsBookingLoading(true);
      try {
        await onBook(id);
      } finally {
        setIsBookingLoading(false);
      }
    } else {
      setLoginModalOpen(true);
    }
  };

  return (
    <Card 
      shadow="none" 
      className="w-full professional-card overflow-hidden group hover:shadow-xl transition-all duration-500 cursor-pointer focus-within:ring-2 focus-within:ring-primary-500/50 focus-within:ring-offset-2"
      role="article"
      aria-label={`${name} booking slot at ${location}`}
    >
      <CardBody className="flex p-4 md:p-6">
        {/* Image on the left */}
        <div className="w-48 h-32 md:h-48 flex-shrink-0">
          <img
            src={image}
            alt={`${name} venue image`}
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
        </div>
        {/* Details on the right */}
        <div className="flex flex-col justify-between flex-1 ml-4">
          <div>
            <div className="flex items-center mb-2">
              <div className="text-yellow-500 mr-1">⭐</div>
              <span className="text-sm font-semibold text-white">{rating}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
            <p className="text-sm text-gray-300">
              <Icon icon="lucide:map-pin" className="mr-1" />
              {location}
            </p>
          </div>
          <div>
            {!hideDetails && (
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <Icon icon="lucide:calendar" className="mr-1" />
                  <span className="text-sm text-gray-300">{date}</span>
                </div>
                <div className="flex items-center">
                  <Icon icon="lucide:clock" className="mr-1" />
                  <span className="text-sm text-gray-300">{time}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between items-center bg-gradient-to-r from-slate-50/80 to-slate-100/80 dark:from-slate-800/40 dark:to-slate-700/40 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-700/50 py-4 md:py-5 px-4 md:px-6">
        {/* Only show price if hideDetails is false */}
        {!hideDetails ? (
          <div className="flex flex-col">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide font-medium">{t.price}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl md:text-2xl font-bold gradient-text-primary">฿{price.toLocaleString()}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">/slot</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75"></div>
            </div>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Available Now</span>
          </div>
        )}
        <Button
          color="primary"
          size="md"
          onPress={handleBookClick}
          isDisabled={!available}
          isLoading={isBookingLoading}
          className="font-semibold px-6 md:px-8 py-2.5 md:py-3 bg-gradient-primary button-glow interactive-scale shadow-lg hover:shadow-xl focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 transition-all duration-300 text-sm md:text-base min-h-[44px] min-w-[120px]"
          radius="full"
          aria-label={available ? (isAuthenticated ? `Book ${name} now` : `Login to book ${name}`) : `${name} is unavailable`}
        >
          {isBookingLoading ? (
            <>
              <Icon icon="lucide:loader-2" className="animate-spin mr-2" width={16} height={16} />
              Booking...
            </>
          ) : (
            available ? (isAuthenticated ? t.bookNow : t.loginToBook) : t.unavailable
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};