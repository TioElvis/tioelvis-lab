import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Fragment } from "react/jsx-runtime";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Readonly<Props>) {
  const session = await auth();

  if (!session) {
    return redirect("/auth/sign-in");
  }

  return <Fragment>{children}</Fragment>;
}
