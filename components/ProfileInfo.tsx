import { authConfig } from "@/app/configs/auth";
import { getServerSession } from "next-auth";

async function ProfileInfo() {
  const session = await getServerSession(authConfig);
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
        <div>
          
          Name: <span className="font-bold capitalize">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
