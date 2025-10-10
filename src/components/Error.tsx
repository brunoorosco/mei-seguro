
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
}: {
  error: Error & { digest?: string; cause?: any };
}) {
  const [errorDetails, setErrorDetails] = useState<Record<string, any>>({});

  useEffect(() => {
    // Collect error information
    const details: Record<string, any> = {
      message: error.message,
      stack: error.stack,
      name: error.name,
    };

    // Add additional context information
    details.url = window.location.href;
    details.timestamp = new Date().toISOString();

    // Set error details
    setErrorDetails(details);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 p-4">
      <div className="text-2xl font-semibold text-red-500">Something went wrong</div>
      <Button
        onClick={() => {
          if (window.parent && window.parent !== window) {
            window.parent.postMessage(
              {
                type: "IFRAME_ERROR",
                payload: errorDetails,
              },
              "*"
            );
          }
        }}
        variant="default"
        className="mt-4 cursor-pointer"
      >
        Fix the issue
      </Button>
    </div>
  );
}
