import Center from "@/Components/Center";
import Sidebar from "@/Components/Sidebar";
import { useSession } from "next-auth/react";

export default function Home() {
  return (
    <>
      <main className=" bg-black h-screen overflow-hidden flex">
          <Sidebar />
          <Center/>
      </main>
      <div className="">
        {/* Bottom */}
      </div>
    </>
  )
}
