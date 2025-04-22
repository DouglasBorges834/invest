import { format, isMatch } from "date-fns";
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { Navbar } from "../_components/navbar";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_componets/expense-per-category";
import { LastTransactions } from "./_componets/last-transactions";
import { SummaryCards } from "./_componets/summary-cards";
import { TimeSelect } from "./_componets/time-select";
import { TransactionPieChart } from "./_componets/transaction-pie-chart";
import { canUserAddTransactions } from "../_data/can-user-add-transaction";

interface ISummaryMonthSelect {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: ISummaryMonthSelect) => {
  const monthIsInvalid: boolean = !month || !isMatch(month, "MM");
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  // console.log(userId, "userId >>> ");

  if (monthIsInvalid) {
    const currentMonth = format(new Date(), "MM");
    redirect(`/?month=${currentMonth}`);
  }
  const dashboardData = await getDashboard(month);

  const userCanAddTransaction = await canUserAddTransactions();

  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>

        <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards
              month={month}
              {...dashboardData}
              userCanAddTransaction={userCanAddTransaction}
            />

            <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <TransactionPieChart {...dashboardData} />
              <ExpensesPerCategory
                expensePerCategory={dashboardData.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboardData.lastTransactions} />
        </div>
      </div>
    </>
  );
};

export default Home;
