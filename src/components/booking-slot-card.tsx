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
    <>
      <Card 
        shadow="none" 
        className="w-full premium-card overflow-hidden group hover:shadow-2xl transition-all duration-500 cursor-pointer focus-within:ring-2 focus-within:ring-primary-500/50 focus-within:ring-offset-2"
        role="article"
        aria-label={`${name} booking slot at ${location}`}
      >
        <CardBody className="p-0 overflow-visible">
          <div className="relative overflow-hidden">
            <img
              src={image}
              alt={`${name} venue image`}
              className="w-full h-44 md:h-52 object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Chip
                color="warning"
                variant="solid"
                startContent={<Icon icon="lucide:star" className="text-white" width={14} height={14} />}
                className="shadow-xl backdrop-blur-sm bg-gradient-to-r from-amber-400 to-orange-500 border border-white/20 px-3 py-1.5"
                size="sm"
                aria-label={`Rating: ${rating.toFixed(1)} stars`}
              >
                {rating.toFixed(1)}
              </Chip>
              {!available && (
                <Chip
                  color="danger"
                  variant="solid"
                  className="shadow-xl backdrop-blur-sm bg-gradient-to-r from-red-500 to-red-600 border border-white/20 px-3 py-1.5"
                  size="sm"
                  aria-label="Fully booked"
                >
                  Fully Booked
                </Chip>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <h3 className="font-bold text-base md:text-lg text-white mb-1 drop-shadow-lg line-clamp-1">{name}</h3>
              <div className="flex items-center gap-1 md:gap-2 text-white/90 text-xs md:text-sm">
                <Icon icon="lucide:map-pin" width={12} height={12} className="md:w-[14px] md:h-[14px] drop-shadow flex-shrink-0" />
                <span className="drop-shadow line-clamp-1">{location}</span>
              </div>
            </div>
          </div>
          
          {/* Only show date/time if hideDetails is false */}
          {!hideDetails && (
            <div className="p-4 md:p-6">
              <div className="flex flex-wrap gap-3 justify-between items-center">
                <div className="flex items-center gap-2 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 px-3 md:px-4 py-2 md:py-2.5 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-600/50">
                  <Icon icon="lucide:calendar" width={16} height={16} className="text-primary-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{date}</span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 px-3 md:px-4 py-2 md:py-2.5 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-600/50">
                  <Icon icon="lucide:clock" width={16} height={16} className="text-primary-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{time}</span>
                </div>
              </div>
            </div>
          )}
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
      
      <LoginModal 
        isOpen={loginModalOpen} 
        onOpenChange={setLoginModalOpen} 
        onSuccess={() => onBook(id)}
      />
    </>
  );
};