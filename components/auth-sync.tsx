"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { syncUserProfile } from "@/actions/sync-profile";

export function AuthSync() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [hasSynced, setHasSynced] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && user && !hasSynced) {
      syncUserProfile()
        .then((result) => {
          if (result.error) {
            console.error("Profile sync error:", result.error);
          } else {
            setHasSynced(true);
          }
        })
        .catch((error) => {
          console.error("Profile sync error:", error);
        });
    }
  }, [isLoaded, isSignedIn, user, hasSynced]);

  return null;
}
