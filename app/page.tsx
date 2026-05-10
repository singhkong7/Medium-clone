import Header from "@/components/Header";
import GuestHome from "@/components/GuestHome";
import UserHome from "@/components/UserHome";
import { getServerSession } from "next-auth";
import {authOptions} from "@/app/lib/auth";


export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("session>>>>>>>>>>>>.",session)
  return (
    <div>
      <Header />
      {!session ? <GuestHome /> : <UserHome />}
    </div>
  );
}