import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Tabs, Tab, Card, CardBody, CardHeader, Button, Chip } from "@heroui/react";
import { Icon } from '@iconify/react';
import { MotionDiv } from '../../shared/components/ui/MotionDiv';
import { MotionH1 } from '../../shared/components/ui/MotionH1';
import { MotionP } from '../../shared/components/ui/MotionP';
import { MotionImg } from '../../shared/components/ui/MotionImg';
import { MotionH3 } from '../../shared/components/ui/MotionH3';
import { useLanguage } from '../../shared/contexts/language-context';
import { getVenueDetails } from '../../shared/data/venues';
import { Skeleton, ServiceCardSkeleton } from '../../shared/components/ui/skeleton';

export const VenueDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = React.useState(true);
  const [venueDetails, setVenueDetails] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);
  
  // Load venue details
  React.useEffect(() => {
    const loadVenueDetails = async () => {
      try {
        setIsLoading(true);
        // Reduce artificial delay for faster loading
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get venue details
        const details = getVenueDetails(id);
        setVenueDetails(details);
      } catch (err) {
        setError('Failed to load venue details');
        console.error('Error loading venue details:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      loadVenueDetails();
    } else {
      setError('Invalid venue ID');
      setIsLoading(false);
    }
  }, [id]);
  
  const handleBookService = (serviceId: string) => {
    history.push(`/booking/${id}/${serviceId}`);
  };
  
  // Show error message if there's an error
  if (error) {
    return (
      <div className="pb-20 md:pb-0 flex items-center justify-center h-64">
        <div className="text-center">
          <Icon icon="lucide:alert-triangle" width={48} height={48} className="mx-auto mb-3 text-danger-500" />
          <p className="text-danger-500 font-medium">{error}</p>
          <Button 
            color="primary" 
            variant="flat" 
            className="mt-4"
            onPress={() => history.push('/')}
          >
            {t.backToHome}
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <MotionDiv 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pb-20 md:pb-0"
    >
      {/* Back Button */}
      <MotionDiv
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mb-4"
      >
        <Button
          variant="light"
          isIconOnly
          startContent={<Icon icon="lucide:arrow-left" width={20} height={20} />}
          onPress={() => history.goBack()}
          className="text-default-600 hover:text-default-900 transition-colors min-w-unit-10 w-10 h-10"
          aria-label={t.back}
        />
      </MotionDiv>
      
      {isLoading ? (
        // Optimized skeleton loading for venue details
        <>
          <MotionDiv
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Skeleton className="h-64 md:h-80 lg:h-96 mb-6 w-full rounded-lg" />
          </MotionDiv>
          
          <MotionDiv
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="mb-6 space-y-3"
          >
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
          </MotionDiv>
          
          <MotionDiv
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="space-y-5"
          >
            <Skeleton className="h-10 w-full" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: 2 }).map((_, index) => (
                <ServiceCardSkeleton key={index} />
              ))}
            </div>
          </MotionDiv>
        </>
      ) : venueDetails ? (
        <>
      <MotionDiv 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative h-64 md:h-80 lg:h-96 mb-6 rounded-lg overflow-hidden"
      >
        <MotionImg 
          src={venueDetails.images[0]} 
          alt={venueDetails.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <MotionDiv 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="flex items-center gap-2 mb-2"
          >
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
          </MotionDiv>
          <MotionH1 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.15 }}
            className="text-3xl font-bold text-white"
          >
            {venueDetails.name}
          </MotionH1>
        </div>
      </MotionDiv>
      
      {/* Tabbed Content Section */}
      <MotionDiv
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mt-6"
      >
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
            <MotionDiv
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              <div className="lg:col-span-2">
                <Card shadow="sm">
                  <CardBody className="p-6">
                    <MotionP 
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.05 }}
                      className="text-default-700 dark:text-default-400 mb-6"
                    >
                      {venueDetails.description}
                    </MotionP>
                    
                    <MotionH3 
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                      className="text-lg font-semibold mb-3"
                    >
                      {t.facilities}
                    </MotionH3>
                    <MotionDiv 
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.15 }}
                      className="flex flex-wrap gap-2 mb-6"
                    >
                      {venueDetails.facilities.map((facility: string, index: number) => (
                        <Chip 
                          key={index} 
                          variant="flat" 
                          color="primary" 
                          size="sm"
                          className="animate-fade-in"
                        >
                          {facility}
                        </Chip>
                      ))}
                    </MotionDiv>
                    
                    <MotionH3 
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                      className="text-lg font-semibold mb-3"
                    >
                      {t.openingHours}
                    </MotionH3>
                    <MotionP 
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.25 }}
                      className="text-default-700 dark:text-default-400 mb-6"
                    >
                      {venueDetails.openingHours}
                    </MotionP>
                    
                    <MotionH3 
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                      className="text-lg font-semibold mb-3"
                    >
                      {t.location}
                    </MotionH3>
                    <MotionDiv 
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.35 }}
                      className="bg-slate-100 dark:bg-slate-800 h-48 rounded-lg flex items-center justify-center mb-6"
                    >
                      <Icon icon="lucide:map" className="text-slate-400" width={48} height={48} />
                    </MotionDiv>
                  </CardBody>
                </Card>
              </div>
              
              <div className="lg:col-span-1">
                <MotionDiv
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.15 }}
                >
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
                </MotionDiv>
                
                <MotionDiv
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                  className="mt-4 grid grid-cols-3 gap-2"
                >
                  {venueDetails.images.map((image: string, index: number) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden">
                      <MotionImg src={image} alt={`${venueDetails.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </MotionDiv>
              </div>
            </MotionDiv>
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
            <MotionDiv
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="mt-6"
            >
              {/* Horizontal service cards layout */}
              <div className="space-y-3">
                {venueDetails.services.map((service: any, index: number) => (
                  <MotionDiv
                    key={service.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="w-full"
                  >
                    <Card shadow="sm" className="w-full hover:shadow-md transition-shadow">
                      <CardBody className="p-0">
                        <div className="flex">
                          {/* Service Image */}
                          <div className="relative w-32 h-32 flex-shrink-0">
                            <MotionImg
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
                                  <span className="font-semibold text-primary-600 dark:text-primary-400">
                                    {service.price.toLocaleString()} THB
                                  </span>
                                  <span className="text-default-500 text-small">
                                    {service.duration} นาที
                                  </span>
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
                  </MotionDiv>
                ))}
              </div>
            </MotionDiv>
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
            <MotionDiv
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="mt-6 p-6 text-center"
            >
              <Icon icon="lucide:message-square" width={48} height={48} className="mx-auto mb-3 text-default-300" />
              <p className="text-default-500">รีวิวจะแสดงที่นี่</p>
            </MotionDiv>
          </Tab>
        </Tabs>
      </MotionDiv>
        </>
      ) : (
        <MotionDiv
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="pb-20 md:pb-0 flex items-center justify-center h-64"
        >
          <div className="text-center">
            <Icon icon="lucide:alert-triangle" width={48} height={48} className="mx-auto mb-3 text-warning-500" />
            <p className="text-warning-500 font-medium">Venue not found</p>
            <Button 
              color="primary" 
              variant="flat" 
              className="mt-4"
              onPress={() => history.push('/')}
            >
              {t.backToHome}
            </Button>
          </div>
        </MotionDiv>
      )}
    </MotionDiv>
  );
};