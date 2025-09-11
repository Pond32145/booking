import React from 'react';
import { Chip } from "@heroui/react";
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/language-context';

type QueueInfo = {
  currentQueue: number;
  estimatedWait: number;
  isOpen: boolean;
};

interface QueueSelectorProps {
  queueInfo: QueueInfo | null;
}

export const QueueSelector: React.FC<QueueSelectorProps> = ({ queueInfo }) => {
  const { t } = useLanguage();

  if (!queueInfo) return null;

  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
        <Icon icon="lucide:clock" width={32} height={32} className="text-primary-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{t.joinQueue}</h3>
      <div className="space-y-2 mb-6">
        <p className="text-default-600">
          <span className="font-semibold text-primary-600">{t.currentQueue}:</span> {queueInfo.currentQueue} คน
        </p>
        <p className="text-default-600">
          <span className="font-semibold text-primary-600">{t.estimatedWait}:</span> {queueInfo.estimatedWait} นาที
        </p>
      </div>
      <Chip 
        color={queueInfo.isOpen ? "success" : "danger"}
        variant="flat"
        size="lg"
      >
        {queueInfo.isOpen ? 'เปิดให้บริการ' : 'ปิดให้บริการ'}
      </Chip>
    </div>
  );
};