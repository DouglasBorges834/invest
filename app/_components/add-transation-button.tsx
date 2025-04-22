"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";
import { UpsertTransationDialog } from "./upsert-transation-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";

interface IAddTransactionButtonProps {
  userCanAddTransaction?: boolean;
}

export const AddTransationButton = ({
  userCanAddTransaction,
}: IAddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogeIsOpden] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Button
              disabled={!userCanAddTransaction}
              className="rounded-full"
              onClick={() => setDialogeIsOpden(true)}
            >
              Adicionar transação <ArrowDownUpIcon />
            </Button>
          </div>
        </TooltipTrigger>

        <TooltipContent className="">
          {!userCanAddTransaction && (
            <div className="flex items-center gap-2">
              <p>Você atingiu o limite de transações, Atualize seu plano!</p>{" "}
              <Button asChild size={"sm"}>
                <Link href={"/subscription"}>Atualizar Plano</Link>
              </Button>
            </div>
          )}
        </TooltipContent>
      </Tooltip>
      <UpsertTransationDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogeIsOpden}
      />
    </TooltipProvider>
  );
};
