"use client";

import Turnstile from "react-turnstile";

interface TurnstileWidgetProps {
  onVerify: (token: string | null) => void;
  onError?: () => void;
  onExpire?: () => void;
  sitekey: string;
}

const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({
  onVerify,
  sitekey,
  onError,
  onExpire,
}) => {
  return (
    <Turnstile
      sitekey={sitekey}
      onVerify={(token) => onVerify(token)}
      onError={() => {
        onError && onError();
        onVerify(null);
      }}
      onExpire={() => {
        onExpire && onExpire();
        onVerify(null);
      }}
      fixedSize={true}
    />
  );
};

export default TurnstileWidget;
