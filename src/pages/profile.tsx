import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, Avatar, Input, Switch, Button, Divider, Tabs, Tab, addToast } from "@heroui/react";
import { Icon } from '@iconify/react';
import { useLanguage } from '../contexts/language-context';

export const ProfilePage: React.FC = () => {
  const history = useHistory();
  const { t } = useLanguage();
  const [name, setName] = React.useState('John Doe');
  const [email, setEmail] = React.useState('john.doe@example.com');
  const [phone, setPhone] = React.useState('+1 (555) 123-4567');
  const [language, setLanguage] = React.useState('en');
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [smsNotifications, setSmsNotifications] = React.useState(false);
  
  const handleSaveProfile = () => {
    addToast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
      color: "success",
    });
  };
  
  return (
    <div className="pb-20 md:pb-0">
      <div className="flex items-center gap-4 mb-4">
        <Button
          variant="light"
          isIconOnly
          startContent={<Icon icon="lucide:arrow-left" width={20} height={20} />}
          onPress={() => history.goBack()}
          className="text-default-600 hover:text-default-900 transition-colors min-w-unit-10 w-10 h-10"
          aria-label={t.back}
        />
        <h1 className="text-2xl font-bold">Profile & Settings</h1>
      </div>
      
      <Tabs aria-label="Profile settings" color="primary" variant="underlined">
        <Tab
          key="profile"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:user" width={18} height={18} />
              <span>Profile</span>
            </div>
          }
        >
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card shadow="sm">
                <CardBody className="flex flex-col items-center p-6">
                  <Avatar
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format"
                    className="w-24 h-24"
                    isBordered
                    color="primary"
                  />
                  <h2 className="mt-4 text-xl font-semibold">{name}</h2>
                  <p className="text-default-500">{email}</p>
                  <Button
                    color="primary"
                    variant="flat"
                    className="mt-4 w-full"
                    startContent={<Icon icon="lucide:upload" />}
                  >
                    Change Photo
                  </Button>
                </CardBody>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card shadow="sm">
                <CardBody className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                  
                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      value={name}
                      onValueChange={setName}
                    />
                    
                    <Input
                      label="Email"
                      type="email"
                      value={email}
                      onValueChange={setEmail}
                    />
                    
                    <Input
                      label="Phone Number"
                      value={phone}
                      onValueChange={setPhone}
                    />
                    
                    <div className="flex justify-end mt-6">
                      <Button color="primary" onPress={handleSaveProfile}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </Tab>
        
        <Tab
          key="preferences"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:settings" width={18} height={18} />
              <span>Preferences</span>
            </div>
          }
        >
          <div className="mt-6">
            <Card shadow="sm">
              <CardBody className="p-6">
                <h2 className="text-xl font-semibold mb-4">Language & Notifications</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-medium font-semibold mb-3">Language</h3>
                    <div className="flex gap-4">
                      <Button
                        variant={language === 'en' ? 'solid' : 'flat'}
                        color={language === 'en' ? 'primary' : 'default'}
                        onPress={() => setLanguage('en')}
                      >
                        English
                      </Button>
                      <Button
                        variant={language === 'th' ? 'solid' : 'flat'}
                        color={language === 'th' ? 'primary' : 'default'}
                        onPress={() => setLanguage('th')}
                      >
                        Thai
                      </Button>
                    </div>
                  </div>
                  
                  <Divider />
                  
                  <div>
                    <h3 className="text-medium font-semibold mb-3">Notifications</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-small text-default-500">Receive booking confirmations and updates</p>
                        </div>
                        <Switch 
                          isSelected={emailNotifications}
                          onValueChange={setEmailNotifications}
                          color="primary"
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-small text-default-500">Receive alerts on your device</p>
                        </div>
                        <Switch 
                          isSelected={pushNotifications}
                          onValueChange={setPushNotifications}
                          color="primary"
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-small text-default-500">Receive text message alerts</p>
                        </div>
                        <Switch 
                          isSelected={smsNotifications}
                          onValueChange={setSmsNotifications}
                          color="primary"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <Button color="primary" onPress={handleSaveProfile}>
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>
        
        <Tab
          key="security"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:shield" width={18} height={18} />
              <span>Security</span>
            </div>
          }
        >
          <div className="mt-6">
            <Card shadow="sm">
              <CardBody className="p-6">
                <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                
                <div className="space-y-4">
                  <Input
                    label="Current Password"
                    type="password"
                    placeholder="Enter current password"
                  />
                  
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                  />
                  
                  <Input
                    label="Confirm New Password"
                    type="password"
                    placeholder="Confirm new password"
                  />
                  
                  <div className="flex justify-end mt-6">
                    <Button color="primary">
                      Update Password
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};