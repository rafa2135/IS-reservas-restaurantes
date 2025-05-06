// app/auth/confirm/page.tsx
"use client"; // <--- Mark as a Client Component

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for App Router
import { createClient } from "@/app/util/supabase/client"; // Adjust path as needed

type Status = "Verifying..." | "Success" | "Error";

export default function AuthConfirmPage() {
  const [status, setStatus] = useState<Status>("Verifying...");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const supabase = createClient();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to hold timeout ID

  useEffect(() => {
    let isMounted = true; // Flag to check if component is still mounted

    // Function to clear the URL hash
    const clearUrlHash = () => {
      if (typeof window !== "undefined") {
        // Use replaceState to avoid adding to browser history
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }
    };

    // Start a timeout to handle cases where no event fires (e.g., invalid link)
    timeoutRef.current = setTimeout(() => {
      if (isMounted && status === "Verifying...") {
        console.log("Timeout reached, assuming verification failed.");
        setStatus("Error");
        setErrorMessage(
          "Verification failed. The link might be invalid, expired, or already used."
        );
        clearUrlHash();
      }
    }, 7000); // Wait 7 seconds before assuming failure

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return; // Don't proceed if component unmounted

      console.log("Auth Event:", event, "Session:", session);

      // Clear the timeout if we receive any relevant event
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Check for explicit errors in the URL hash first
      // This needs to run client-side where window is available
      if (
        typeof window !== "undefined" &&
        window.location.hash.includes("error=")
      ) {
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        ); // Remove '#'
        const error = hashParams.get("error");
        const errorDescription = hashParams.get("error_description");

        if (error) {
          console.error("Error from URL hash:", error, errorDescription);
          setStatus("Error");
          setErrorMessage(
            errorDescription || "An error occurred during verification."
          );
          clearUrlHash();
          return; // Stop further processing
        }
      }

      // Handle successful verification (SIGNED_IN event usually occurs)
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        // Check if the user object exists and email is confirmed
        if (session?.user?.email_confirmed_at) {
          console.log("Email verification successful!");
          setStatus("Success");
          setErrorMessage("");
          clearUrlHash();

          // Redirect after a short delay
          setTimeout(() => {
            router.push("/dashboard"); // Redirect to dashboard or home page
          }, 2000); // 2 second delay
        } else if (session?.user && !session?.user?.email_confirmed_at) {
          // User is signed in, but email not marked confirmed yet.
          // This might happen briefly. Keep verifying or show error after timeout.
          console.warn(
            "User session found, but email not confirmed yet. Waiting or timeout will trigger error."
          );
          // Keep status as 'Verifying...' - the timeout will handle failure if it persists
        } else {
          // SIGNED_IN event but session/user is invalid - likely indicates an issue
          console.error(
            "SIGNED_IN event, but session or user invalid/unconfirmed."
          );
          setStatus("Error");
          setErrorMessage("Verification failed. Could not confirm session.");
          clearUrlHash();
        }
      } else if (event === "INITIAL_SESSION" && !session) {
        // If the initial check finds no session and there's no error in hash,
        // it's likely the link was bad/expired. The timeout will handle this,
        // but we can log it.
        console.log("Initial session check: No active session found.");
        // Let the timeout handle setting the error state
      } else if (event === "SIGNED_OUT") {
        // If we get signed out immediately, it probably failed.
        console.error("Received SIGNED_OUT event during confirmation.");
        setStatus("Error");
        setErrorMessage(
          "Verification failed. The link might be invalid or expired."
        );
        clearUrlHash();
      }
    });

    // Cleanup function
    return () => {
      isMounted = false; // Set flag to false when unmounting
      if (subscription) {
        subscription.unsubscribe();
      }
      // Clear timeout on unmount
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, supabase]); // Add dependencies

  return (
    <div>
      <h1>Email Verification</h1>
      <p>Status: {status}</p>
      {status === "Verifying..." && (
        <p>Please wait while we verify your email address...</p>
      )}
      {status === "Success" && (
        <p>Your email has been successfully verified! Redirecting...</p>
      )}
      {status === "Error" && (
        <>
          <p style={{ color: "red" }}>
            Error: {errorMessage || "An unknown error occurred."}
          </p>
          <p>
            Please try signing up again or contact support if the problem
            persists.
          </p>
          {/* Optional: Add a link back to login or signup */}
          {/* <Link href="/login">Go to Login</Link> */}
        </>
      )}
    </div>
  );
}
