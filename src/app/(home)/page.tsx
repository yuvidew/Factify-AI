import { getCurrent } from "@/features/auth/queries";
import { Header } from "@/features/home/_components/header";
import { HomeView } from "@/features/home/_components/home-view";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");
  
  return (
    <HomeView 
      isUserLogin={!!user}
      header={<Header isUserLogin={!!user} />}
    />
  );
}
