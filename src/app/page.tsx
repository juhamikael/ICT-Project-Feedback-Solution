import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import RedirectUser from "@/components/redirectUser";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  return <RedirectUser isAuthenticated={isAuthenticated()} />;
}
