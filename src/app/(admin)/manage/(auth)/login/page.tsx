import { AdminLoginForm } from "@/components/features/admin/login-form.admin";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>
}) {
  const LoadingComponent = () => {
    return (
      <div className="w-[400px] h-[434px] bg-white rounded-lg px-6 py-8 shadow-md border border-gray-200 flex items-center justify-center">
        <Spinner className="size-8 opacity-80" />
      </div>
    )
  }

  return (
    <div className="w-full flex justify-center">
      <Suspense fallback={<LoadingComponent />}>
        <AdminLoginForm searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
