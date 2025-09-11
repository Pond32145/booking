import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Checkbox } from "@heroui/react";
import { Icon } from '@iconify/react';
import { useAuth } from '../../contexts/auth-context';
import { useLanguage } from '../../contexts/language-context';

interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onOpenChange, onSuccess }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();

  const handleLogin = async () => {
    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);
    
    if (success) {
      onOpenChange(false);
      if (onSuccess) onSuccess();
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="blur"
      classNames={{
        backdrop: "bg-slate-900/50",
        base: "border-none bg-white dark:bg-content1 text-foreground",
        header: "border-b border-slate-200 dark:border-slate-700",
        footer: "border-t border-slate-200 dark:border-slate-700"
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-primary-500 flex items-center justify-center">
                  <Icon icon="lucide:log-in" className="text-white" width={18} height={18} />
                </div>
                <span className="text-lg">เข้าสู่ระบบ</span>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4 py-4">
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white">
                    <Icon icon="lucide:user" width={36} height={36} />
                  </div>
                </div>
                
                <Input
                  autoFocus
                  label="อีเมล"
                  placeholder="กรอกอีเมลของคุณ"
                  variant="bordered"
                  value={email}
                  onValueChange={setEmail}
                  startContent={<Icon icon="lucide:mail" className="text-slate-400" />}
                  classNames={{
                    inputWrapper: "bg-white dark:bg-content1 border-slate-200 dark:border-slate-700"
                  }}
                />
                
                <Input
                  label="รหัสผ่าน"
                  placeholder="กรอกรหัสผ่านของคุณ"
                  type="password"
                  variant="bordered"
                  value={password}
                  onValueChange={setPassword}
                  startContent={<Icon icon="lucide:lock" className="text-slate-400" />}
                  classNames={{
                    inputWrapper: "bg-white dark:bg-content1 border-slate-200 dark:border-slate-700"
                  }}
                />
                
                <div className="flex justify-between items-center">
                  <Checkbox isSelected={rememberMe} onValueChange={setRememberMe}>
                    จดจำฉัน
                  </Checkbox>
                  <Button variant="light" size="sm" className="text-primary-500">
                    ลืมรหัสผ่าน?
                  </Button>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                ยกเลิก
              </Button>
              <Button 
                color="primary" 
                onPress={handleLogin}
                isLoading={isLoading}
                className="font-medium"
              >
                เข้าสู่ระบบ
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};