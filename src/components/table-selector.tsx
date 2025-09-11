import React from 'react';
import { Card, CardBody, Chip } from "@heroui/react";
import { Icon } from '@iconify/react';
import { TableInfo, getTableLocationLabel } from '../data/services';
import { useLanguage } from '../contexts/language-context';

interface TableSelectorProps {
  tables: TableInfo[];
  selectedTable: string | null;
  onTableSelect: (tableId: string) => void;
}

export const TableSelector: React.FC<TableSelectorProps> = ({
  tables,
  selectedTable,
  onTableSelect
}) => {
  const { t } = useLanguage();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tables.map((table) => (
          <div
            key={table.id}
          >
            <Card 
              shadow="sm" 
              isPressable
              isHoverable
              onPress={() => table.available && onTableSelect(table.id)}
              className={`w-full transition-all ${
                selectedTable === table.id 
                  ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                  : table.available 
                    ? 'hover:shadow-md' 
                    : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <CardBody className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-medium">{table.name}</h4>
                    <p className="text-small text-default-500">
                      {getTableLocationLabel(table.location)} • {table.capacity} ที่นั่ง
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Chip 
                      size="sm"
                      color={table.available ? "success" : "default"}
                      variant="flat"
                    >
                      {table.available ? t.tableAvailable : t.tableBooked}
                    </Chip>
                    {table.availableUntil && table.available && (
                      <span className="text-tiny text-default-400">
                        {t.availableUntil} {table.availableUntil}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-3">
                  <Icon 
                    icon={table.location === 'window' ? 'lucide:sun' : 
                         table.location === 'private' ? 'lucide:lock' :
                         table.location === 'bar' ? 'lucide:wine' :
                         'lucide:users'} 
                    width={16} height={16} 
                    className="text-default-400" 
                  />
                  <Icon icon="lucide:users" width={16} height={16} className="text-default-400" />
                  <span className="text-small text-default-500">{table.capacity} คน</span>
                  
                  {selectedTable === table.id && (
                    <div className="ml-auto">
                      <Icon icon="lucide:check-circle" width={20} height={20} className="text-primary-500" />
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-success-500 rounded-full"></div>
          <span className="text-small">{t.tableAvailable}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-default-300 rounded-full"></div>
          <span className="text-small">{t.tableBooked}</span>
        </div>
      </div>
    </>
  );
};