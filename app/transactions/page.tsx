import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@clerk/nextjs/server";

import { DataTable } from "../_components/ui/data-table";
import { AddTransationButton } from "../_components/add-transation-button";
import { Navbar } from "../_components/navbar";
import { db } from "../_lib/prisma";
import { transactionColumns } from "./_colunms";
import { ScrollArea } from "../_components/ui/scroll-area";
import { canUserAddTransactions } from "../_data/can-user-add-transaction";

const TransactionPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });
  const userCanAddTransaction = await canUserAddTransactions();

  //composition pattern
  return (
    <>
      <Navbar />
      <div className="h-dvh space-y-6 p-6">
        {/* TÍTULO E BOTÃO */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransationButton userCanAddTransaction={userCanAddTransaction} />
        </div>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <DataTable columns={transactionColumns} data={transactions} />
        </ScrollArea>
      </div>
    </>
  );
};

export default TransactionPage;
