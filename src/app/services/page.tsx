import React from "react";
import {
  AlertCircle,
  Search,
  FileText,
  TrendingUp,
  Shield,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="text-blue-600 dark:text-blue-400 mr-2">{children}</div>
);

const Section = ({
  title,
  content,
  icon,
}: {
  title: string;
  content: string;
  icon: React.ReactNode;
}) => (
  <section
    className="mb-8"
    aria-labelledby={`${title.toLowerCase().replace(/\s+/g, "-")}-heading`}
  >
    <h2
      id={`${title.toLowerCase().replace(/\s+/g, "-")}-heading`}
      className="text-2xl font-semibold text-gray-800 dark:text-neutral-100 mb-4 flex items-center"
    >
      <IconWrapper>{icon}</IconWrapper>
      {title}
    </h2>
    <p className="text-gray-700 dark:text-neutral-300 mb-4">{content}</p>
  </section>
);

const ServicesPage = () => {
  return (
    <div className="dark:bg-neutral-900 p-6 md:p-10 mt-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-8 text-center">
          Our Services and How VINs Work
        </h1>

        <Section
          title="Understanding VINs"
          icon={<Shield size={24} />}
          content="A Vehicle Identification Number (VIN) is a unique code assigned to every motor vehicle when it's manufactured. Think of it as a car's fingerprint - no two vehicles in operation have the same VIN. A VIN is composed of 17 characters (digits and capital letters) that act as a distinct identifier for the vehicle."
        />

        <Section
          title="VIN Structure"
          icon={<FileText size={24} />}
          content="The VIN is divided into specific sections, each providing unique information about the vehicle:"
        />
        <ul className="list-disc list-inside text-gray-700 dark:text-neutral-300 mb-8 ml-6">
          <li>World Manufacturer Identifier (positions 1-3)</li>
          <li>Vehicle Descriptor Section (positions 4-8)</li>
          <li>Vehicle Identifier Section (positions 9-17)</li>
        </ul>

        <Section
          title="Our Services"
          icon={<Search size={24} />}
          content="At vin-decode.com, we specialize in decoding VINs to provide you with comprehensive information about vehicles. Our services include:"
        />
        <ul className="list-disc list-inside text-gray-700 dark:text-neutral-300 mb-8 ml-6">
          <li>
            <b>Instant VIN Decoding:</b> Get detailed information about any
            vehicle in seconds.
          </li>
          <li>
            <b>Recall Information:</b> Stay informed about any recalls or safety
            issues related to a specific vehicle.
          </li>
        </ul>

        <Section
          title="Why Use Our VIN Decoder?"
          icon={<TrendingUp size={24} />}
          content="Our advanced VIN decoding technology provides accurate, up-to-date information to help you make informed decisions. Whether you're buying a used car, selling your vehicle, or just curious about your car's specifications, our VIN decoder offers valuable insights."
        />

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Start Decoding Today</AlertTitle>
          <AlertDescription>
            Ready to unlock the secrets of any vehicle? Try our VIN decoder now
            and discover the wealth of information hidden in those 17
            characters!
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default ServicesPage;
