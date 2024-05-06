import authService from "@/app/services/authService";
import clsx from "clsx";
import Link from "next/link";

interface VerifyProps {
  searchParams: Record<string, string | undefined>;
}

export default async function Verify({ searchParams }: VerifyProps) {
  const token = searchParams.token;
  let message = "";
  let isSuccess = false;

  if (!token) {
    message = "Invalid token";
  } else {
    try {
      const data = await authService.verifyEmail(token);
      message = data.message;
      isSuccess = true;
    } catch (error) {
      message = error instanceof Error ? error.message : "Verification failed";
    }
  }

  return (
    <div className="card card-body p-4 p-sm-5 mt-sm-n5 mb-n5">
      <div className="text-center">
        <h2
          className={clsx(
            "d-block",
            isSuccess ? "text-success" : "text-danger"
          )}
        >
          {message}
        </h2>
        <Link href="/signin">Go to sign in</Link>
      </div>
    </div>
  );
}
