import { useSearchParams } from "next/navigation";

export default function ConfirmPage() {
  const searchParams = useSearchParams();

  const success = searchParams.get("success");
  const error = searchParams.get("error");

  if (success === "true") {
    return <p>Email verification successful!</p>;
  } else if (error) {
    return <p>Error: {error}</p>;
  } else {
    return <p>Unknown result</p>;
  }
}
