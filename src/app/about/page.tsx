import React from 'react';
import { AlertCircle, Car, Wrench, Users, Mail } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from 'next/image';

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="text-gray-900 dark:text-neutral-100 mr-2">
    {children}
  </div>
);

const Section = ({ title, content, icon }: { title: string, content: string, icon: React.ReactNode }) => (
  <section className="mb-8" aria-labelledby={`${title.toLowerCase()}-heading`}>
    <h2 id={`${title.toLowerCase()}-heading`} className="text-2xl font-semibold text-gray-800 dark:text-neutral-100 mb-4 flex items-center">
      <IconWrapper>{icon}</IconWrapper>
      {title}
    </h2>
    <p className="text-gray-700 dark:text-neutral-300 mb-4">
      {content}
    </p>
  </section>
);

const AboutPage = () => {
  return (
    <div className="min-h-screen dark:bg-neutral-900 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-8 text-center">
          About VIN-Decode.com
        </h1>

        <Section 
          title="Our Mission" 
          icon={<Car size={24} />}
          content="At VIN-Decode.com, we're dedicated to providing accurate and comprehensive Vehicle Identification Number (VIN) decoding services. Our goal is to empower car owners, buyers, and enthusiasts with detailed information about their vehicles."
        />

        <Section 
          title="Our Services" 
          icon={<Wrench size={24} />}
          content="We offer a range of valuable services to meet your vehicle information needs:"
        />
        <ul className="list-disc list-inside text-gray-700 dark:text-neutral-300 mb-8 ml-6">
          <li>Instant VIN decoding</li>
          <li>Detailed vehicle specifications</li>
          <li>Vehicle history reports</li>
          <li>Market value estimations</li>
        </ul>

        <Section 
          title="Our Team" 
          icon={<Users size={24} />}
          content="Our team consists of automotive experts, data scientists, and software engineers who are passionate about delivering the most accurate and up-to-date vehicle information."
        />

        <section className="mb-8" aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="text-2xl font-semibold text-gray-800 dark:text-neutral-100 mb-4 flex items-center">
            <IconWrapper><Mail size={24} /></IconWrapper>
            Contact Us
          </h2>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Get in Touch</AlertTitle>
            <AlertDescription>
              Have questions or feedback? We&apos;d love to hear from you! Contact us at support@vin-decode.com or call us at (555) 123-4567.
            </AlertDescription>
          </Alert>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;