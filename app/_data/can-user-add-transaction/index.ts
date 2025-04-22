import { getCurrentMonthTransactions } from "../get-current_month/index";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const canUserAddTransactions = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found");
  }

  const user = await clerkClient().users.getUser(userId);

  if (user.publicMetadata.subscriptionPlan == "premium") {
    return true;
  }
  //passar daqui e gratis

  const currenteMonthTransactions = await getCurrentMonthTransactions();

  if (currenteMonthTransactions >= 10) {
    return false;
  }

  return true;
};
