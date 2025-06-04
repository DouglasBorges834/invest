import { auth } from "@clerk/nextjs/server";
import { Navbar } from "../_components/navbar";

const Subscription = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Subscription;
