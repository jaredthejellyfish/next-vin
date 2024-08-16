'use client';

import Script from 'next/script';
import { useEffect, useRef, useState, useCallback } from 'react';

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

type CaptchaProps = Partial<Turnstile.RenderParameters> & {
  sitekey?: string;
};

export default function Captcha({ sitekey, ...rest }: CaptchaProps) {
  const widgetID = useRef<string>();
  const [isError, setIsError] = useState(false);

  const handleError = useCallback((e?: string | Error) => {
    console.log(`Captcha error`, e);
    setIsError(true);
    rest['error-callback']?.();
  }, [rest]);

  const renderWidget = useCallback(() => {
    try {
      const turnstileConfig = {
        ...rest,
        sitekey: sitekey || process.env.NEXT_PUBLIC_TURNSLITE_SITE_KEY || '',
        'error-callback': handleError,
      };
      
      widgetID.current = turnstile.render('#captcha-container', turnstileConfig);
      
      if (!widgetID.current) {
        throw new Error(`turnstile.render returned invalid widgetID`);
      }
    } catch (e) {
      handleError(e as Error);
    }
  }, [sitekey, rest, handleError]);

  useEffect(() => {
    if (!widgetID.current && (window as any).turnstile) {
      renderWidget();
    }
    return () => {
      (window as any).turnstile?.remove(widgetID.current || '');
      widgetID.current = undefined;
    };
  }, [renderWidget]);

  return (
    <>
      <div id="captcha-container" className='mt-5 -mb-4'></div>
      <Script
        src={SCRIPT_SRC}
        onLoad={renderWidget}
        onError={(e) => handleError(`Script load error: ${e.message}`)}
      />
    </>
  );
}