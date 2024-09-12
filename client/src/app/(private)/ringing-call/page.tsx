import RingingCall from "@/app/components/RingingCall";
import RingingCallSpinner from "@/app/components/RingingCall/RingingCallSpinner";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<RingingCallSpinner isLoading={true} />}>
      <RingingCall />
    </Suspense>
  );
}
