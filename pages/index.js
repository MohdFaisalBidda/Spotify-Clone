import Center from "@/Components/Center";
import Player from "@/Components/Player";
import Sidebar from "@/Components/Sidebar";
import { getSession, useSession } from "next-auth/react";

export default function Home() {
  return (
    <><div className="bg-black">

      <main className=" bg-black h-screen overflow-hidden flex">
        <Sidebar />
        <Center />
        <div className=" fixed bottom-0">
          <Player />
        </div>
      </main>
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
