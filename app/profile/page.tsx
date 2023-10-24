import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";

async function Profile() {
  const session = await getServerSession(authConfig);

  return (
    <div className="my-40">
      <h1>Profile of {session?.user?.name}</h1>
      {session?.user?.image && <img src={session.user.image} alt="user"/>}
    </div>
  );
}

export default Profile;
