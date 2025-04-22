import React, { ReactNode } from "react";

import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { AddTransationButton } from "@/app/_components/add-transation-button";

interface ISummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  userCanAddTransaction?: boolean;
}
const amountFormater = (amount: number) => {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
};

export const Summarycard = ({
  title,
  amount,
  icon,
  size = "small",
  userCanAddTransaction,
}: ISummaryCardProps) => {
  return (
    <Card className={`${size === "large" ? "bg-white bg-opacity-5" : ""}`}>
      <CardHeader className="flex-row items-center gap-2">
        {icon}
        <p
          className={`${size === "small" ? "text-sm text-muted-foreground" : "text-white opacity-70"}`}
        >
          {title}
        </p>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <div
          className={`font-bold ${size == "small" ? "text-base md:text-2xl" : "text-4xl"}`}
        >
          {amountFormater(amount) || 0}
        </div>
        {size == "large" && (
          <AddTransationButton userCanAddTransaction={userCanAddTransaction} />
        )}
      </CardContent>
    </Card>
  );
};
