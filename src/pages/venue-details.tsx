import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, Tabs, Tab, Chip, Button, Divider } from "@heroui/react";
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/language-context';
import { getVenueDetails, VenueDetails, ServiceItem } from '../data/venues';
import { Skeleton, ServiceCardSkeleton } from '../components/skeleton';

export const VenueDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = React.useState(true);
  
  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);
  
  // Mock data for venue details
  const venueDetails: VenueDetails = getVenueDetails(id!);
  
  const handleBookService = (serviceId: string) => {
    history.push(`/booking/${id}/${serviceId}`);
  };
  
  return (
    <div className="pb-20 md:pb-0">
      {/* Back Button */}
      <div className="mb-4">
        <Button
          variant="light"
          isIconOnly
          startContent={<Icon icon="lucide:arrow-left" width={20} height={20} />}
          onPress={() => history.goBack()}
          className="text-default-600 hover:text-default-900 transition-colors min-w-unit-10 w-10 h-10"
          aria-label={t.back}
        />
      </div>
      
      {isLoading ? (
        // Skeleton loading for venue details
        <>
          <Skeleton className="h-64 md:h-80 lg:h-96 mb-6 w-full rounded-lg" />
          
          <div className="mb-6 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
          </div>
          
          <div className="space-y-6">
            <Skeleton className="h-12 w-full" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <ServiceCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
      <div className="relative h-64 md:h-80 lg:h-96 mb-6 rounded-lg overflow-hidden">
        <img 
          src={venueDetails.images[0]} 
          alt={venueDetails.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <div className="flex items-center gap-2 mb-2">
            <Chip
              color="warning"
              variant="solid"
              startContent={<Icon icon="lucide:star" className="text-white" />}
              className="shadow-md border border-white/10"
            >
              {venueDetails.rating.toFixed(1)}
            </Chip>
            <Chip
              color="default"
              variant="solid"
              className="bg-white/20 backdrop-blur-sm border border-white/10"
            >
              {venueDetails.location}
            </Chip>
          </div>
          <h1 className="text-3xl font-bold text-white">{venueDetails.name}</h1>
        </div>
      </div>
      
      <Tabs 
        aria-label="Venue details" 
        color="primary" 
        variant="underlined"
        classNames={{
          tabList: "bg-white dark:bg-content1 p-1 rounded-xl shadow-sm",
          cursor: "bg-primary-500",
          tab: "data-[hover=true]:text-primary-500 font-medium"
        }}
      >
        <Tab
          key="about"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:info" width={18} height={18} />
              <span>{t.about}</span>
            </div>
          }
        >
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card shadow="sm">
                <CardBody className="p-6">
                  <p className="text-default-700 dark:text-default-400 mb-6">{venueDetails.description}</p>
                  
                  <h3 className="text-lg font-semibold mb-3">{t.facilities}</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {venueDetails.facilities.map((facility, index) => (
                      <Chip key={index} variant="flat" color="primary" size="sm">
                        {facility}
                      </Chip>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3">{t.openingHours}</h3>
                  <p className="text-default-700 dark:text-default-400 mb-6">{venueDetails.openingHours}</p>
                  
                  <h3 className="text-lg font-semibold mb-3">{t.location}</h3>
                  <div className="bg-slate-100 dark:bg-slate-800 h-48 rounded-lg flex items-center justify-center mb-6">
                    <Icon icon="lucide:map" className="text-slate-400" width={48} height={48} />
                  </div>
                </CardBody>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <Card shadow="sm">
                <CardHeader className="pb-0">
                  <h3 className="text-lg font-semibold">{t.contactInfo}</h3>
                </CardHeader>
                <CardBody className="py-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                        <Icon icon="lucide:phone" className="text-primary-500" />
                      </div>
                      <div>
                        <p className="text-small text-default-500">{t.phone}</p>
                        <p className="font-medium">{venueDetails.contactInfo.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                        <Icon icon="lucide:mail" className="text-primary-500" />
                      </div>
                      <div>
                        <p className="text-small text-default-500">Email</p>
                        <p className="font-medium">{venueDetails.contactInfo.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                        <Icon icon="lucide:globe" className="text-primary-500" />
                      </div>
                      <div>
                        <p className="text-small text-default-500">Website</p>
                        <p className="font-medium">{venueDetails.contactInfo.website}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <div className="mt-4 grid grid-cols-3 gap-2">
                {venueDetails.images.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img src={image} alt={`${venueDetails.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Tab>
        
        <Tab
          key="services"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:list" width={18} height={18} />
              <span>{t.services}</span>
            </div>
          }
        >
          <div className="mt-6">
            {/* Horizontal service cards layout */}
            <div className="space-y-3">
              {venueDetails.services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="w-full"
                >
                  <Card shadow="sm" className="w-full hover:shadow-md transition-shadow">
                    <CardBody className="p-0">
                      <div className="flex">
                        {/* Service Image */}
                        <div className="relative w-32 h-32 flex-shrink-0">
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-full object-cover rounded-l-lg"
                          />
                        </div>
                        
                        {/* Service Content */}
                        <div className="flex-1 p-3 flex flex-col justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-medium mb-1 line-clamp-1">{service.name}</h3>
                            <p className="text-default-500 text-small mb-2 line-clamp-2">{service.description}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                              </div>
                              
                              <Button
                                color="primary"
                                size="sm"
                                className="min-w-20"
                                onPress={() => handleBookService(service.id)}
                              >
                                {t.bookNow}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </Tab>
        
        <Tab
          key="reviews"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:message-square" width={18} height={18} />
              <span>{t.reviews}</span>
            </div>
          }
        >
          <div className="mt-6 p-6 text-center">
            <Icon icon="lucide:message-square" width={48} height={48} className="mx-auto mb-3 text-default-300" />
            <p className="text-default-500">รีวิวจะแสดงที่นี่</p>
          </div>
        </Tab>
      </Tabs>
        </>
      )}
    </div>
  );
};