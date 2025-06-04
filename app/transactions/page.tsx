import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@clerk/nextjs/server";

import { DataTable } from "../_components/ui/data-table";
import { AddTransationButton } from "../_components/add-transation-button";
import { Navbar } from "../_components/navbar";
import { db } from "../_lib/prisma";
import { transationsColumns } from "./_colunms";

const TransactionPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }
  const transation = await db.transaction.findMany({
    where: {
      userId,
    },
  });

  //composition pattern
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransationButton />
        </div>
        <DataTable
          columns={transationsColumns}
          data={JSON.parse(JSON.stringify(transation))} //converte antes de chagar aqui
        />
      </div>
    </>
  );
};

export default TransactionPage;
