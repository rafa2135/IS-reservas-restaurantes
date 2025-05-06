"use client";
//cambiar este codigo mas adelante
//hacerlo mas limpio
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/util/supabase/client";

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

    //timeout
    timeoutRef.current = setTimeout(() => {
      if (isMounted && status === "Verifying...") {
        console.log("Timeout reached, assuming verification failed.");
        setStatus("Error");
        setErrorMessage(
          "Verification failed. The link might be invalid, expired, or already used."
        );
        clearUrlHash();
      }
    }, 7000); // esperar 7 segundos

    // cambio de estado de autenticacion
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return; // verificacion de montado

      console.log("Auth Event:", event, "Session:", session);

      // resetear timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // verificar si hay un error en la URL
      if (
        typeof window !== "undefined" &&
        window.location.hash.includes("error=")
      ) {
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );
        const error = hashParams.get("error");
        const errorDescription = hashParams.get("error_description");

        if (error) {
          console.error("Error from URL hash:", error, errorDescription);
          setStatus("Error");
          setErrorMessage(
            errorDescription || "An error occurred during verification."
          );
          clearUrlHash();
          return; // terminar funcion
        }
      }

      // el usuario está autenticado
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        // verificar si el usuario tiene el email confirmado
        if (session?.user?.email_confirmed_at) {
          console.log("Email verification successful!");
          setStatus("Success");
          setErrorMessage("");
          clearUrlHash();

          // redireccionar el usuario
          setTimeout(() => {
            router.push("/dashboard"); // dashboard
          }, 2000);
        } else if (session?.user && !session?.user?.email_confirmed_at) {
          console.warn(
            "User session found, but email not confirmed yet. Waiting or timeout will trigger error."
          );
        } else {
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
        </>
      )}
    </div>
  );
}
