import Center from "@/Components/Center";
import Player from "@/Components/Player";
import Sidebar from "@/Components/Sidebar";
import { getSession } from "next-auth/react";

export default function Home() {
  return (
    <>
      <div className="bg-black h-screen overflow-hidden ">

        <main className="flex">
          <Sidebar />
          <Center />
        </main>
        <div className="sticky bottom-0">
          <Player />
        </div>
      </div>
    </>
  )
}
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    }
  }
}
