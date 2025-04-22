import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import React from "react";

import { Summarycard } from "./summary-card";

interface ISumaryCardProps {
  month: string;
  totalBalance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  userCanAddTransaction?: boolean;
}

export const SummaryCards = async ({
  totalBalance,
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  userCanAddTransaction,
}: ISumaryCardProps) => {
  return (
    <div className="space-y-6">
      <Summarycard
        title="Saldo"
        icon={<WalletIcon size={16} />}
        amount={totalBalance}
        size="large"
        userCanAddTransaction={userCanAddTransaction}
      />
      <div className="grid grid-cols-3 gap-6">
        <Summarycard
          icon={<PiggyBankIcon size={16} className="text-primary" />}
          title="investimento"
          amount={investmentsTotal}
        />
        <Summarycard
          icon={<TrendingUpIcon size={16} className="text-green-700" />}
          title="Receita"
          amount={depositsTotal}
        />
        <Summarycard
          icon={<TrendingDownIcon size={16} className="text-destructive" />}
          title="Despesas"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
};
