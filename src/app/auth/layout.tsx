import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Fragment } from "react/jsx-runtime";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Readonly<Props>) {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return <Fragment>{children}</Fragment>;
}
