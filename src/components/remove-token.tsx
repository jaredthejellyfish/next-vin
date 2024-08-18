"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const RemoveTokenParamOrRedirect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    
    if (currentParams.has("token")) {
      currentParams.delete("token");
      
      const newUrl = 
        window.location.pathname + 
        (currentParams.toString() ? `?${currentParams.toString()}` : '');
      
      router.replace(newUrl, { scroll: false });
    } else {
      // If there's no token, redirect to the main page
      router.push('/');
    }
  }, [router, searchParams]);

  return null; // This component doesn't render anything
};

export default RemoveTokenParamOrRedirect;