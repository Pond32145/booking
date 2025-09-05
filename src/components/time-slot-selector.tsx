import React from 'react';
import { Button } from "@heroui/react";
import { TimeSlot } from '../data/services';
import { useLanguage } from '../contexts/language-context';

interface TimeSlotSelectorProps {
  timeSlots: TimeSlot[];
  selectedTimeSlot: string | null;
  onTimeSlotSelect: (timeSlotId: string) => void;
}

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  timeSlots,
  selectedTimeSlot,
  onTimeSlotSelect
}) => {
  const { t } = useLanguage();

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {timeSlots.map((slot) => (
          <Button
            key={slot.id}
            color={selectedTimeSlot === slot.id ? "primary" : "default"}
            variant={selectedTimeSlot === slot.id ? "solid" : "flat"}
            onPress={() => slot.available && onTimeSlotSelect(slot.id)}
            isDisabled={!slot.available}
            className={`w-full ${!slot.available ? 'opacity-50' : ''}`}
          >
            {slot.time}
          </Button>
        ))}
      </div>
      
      <div className="flex items-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
          <span className="text-small">{t.availableSlots}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-default-300 rounded-full"></div>
          <span className="text-small">{t.bookedSlots}</span>
        </div>
      </div>
    </>
  );
};