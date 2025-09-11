import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, Input, Textarea, Button, Accordion, AccordionItem, addToast } from "@heroui/react";
import { Icon } from '@iconify/react';
import { useLanguage } from '../../shared/contexts/language-context';

export const SupportPage: React.FC = () => {
  const history = useHistory();
  const { t } = useLanguage();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
      color: "success",
    });
    // Reset form
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };
  
  const faqs = [
    {
      question: "How do I cancel a booking?",
      answer: "You can cancel a booking by going to 'My Bookings', selecting the booking you wish to cancel, and clicking the 'Cancel' button. Please note that cancellation policies vary by service provider."
    },
    {
      question: "Can I reschedule my appointment?",
      answer: "Yes, you can reschedule by going to 'My Bookings', finding the booking you want to change, and clicking 'Reschedule'. Available time slots will be shown based on the service provider's availability."
    },
    {
      question: "How do I get a refund?",
      answer: "Refund policies vary by service provider. Generally, cancellations made 24 hours before the scheduled time are eligible for a full refund. Please check the specific terms for your booking or contact our support team for assistance."
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes, we use industry-standard encryption and security measures to protect your payment information. We never store your complete credit card details on our servers."
    },
    {
      question: "How do I change my account information?",
      answer: "You can update your account information by going to the 'Profile' section. There you can edit your personal details, change your password, and update notification preferences."
    }
  ];
  
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
        <h1 className="text-2xl font-bold">Help & Support</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card shadow="sm">
            <CardHeader className="pb-0">
              <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
            </CardHeader>
            <CardBody>
              <Accordion variant="splitted">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    aria-label={faq.question}
                    title={faq.question}
                    indicator={({ isOpen }) => (
                      <Icon
                        icon={isOpen ? "lucide:chevron-up" : "lucide:chevron-down"}
                        className="text-primary"
                      />
                    )}
                  >
                    <p className="text-default-600">{faq.answer}</p>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardBody>
          </Card>
        </div>
        
        <div>
          <Card shadow="sm">
            <CardHeader className="pb-0">
              <h2 className="text-xl font-semibold">Contact Us</h2>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Name"
                  placeholder="Your name"
                  value={name}
                  onValueChange={setName}
                  isRequired
                />
                
                <Input
                  label="Email"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onValueChange={setEmail}
                  isRequired
                />
                
                <Input
                  label="Subject"
                  placeholder="What is this about?"
                  value={subject}
                  onValueChange={setSubject}
                  isRequired
                />
                
                <Textarea
                  label="Message"
                  placeholder="How can we help you?"
                  value={message}
                  onValueChange={setMessage}
                  minRows={4}
                  isRequired
                />
                
                <Button
                  type="submit"
                  color="primary"
                  className="w-full"
                >
                  Send Message
                </Button>
              </form>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:mail" className="text-primary" />
                  <span>support@bookease.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:phone" className="text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:clock" className="text-primary" />
                  <span>Mon-Fri: 9AM-6PM</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};