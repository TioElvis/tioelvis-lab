import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SignInForm } from "./components/sign-in-form";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

export default async function Page() {
  const session = await auth();

  if (session?.user) {
    return redirect("/dashboard");
  }

  return (
    <MaxWidthWrapper className="w-full h-screen grid  place-content-center">
      <SignInForm />
    </MaxWidthWrapper>
  );
}
