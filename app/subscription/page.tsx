import { CheckIcon, XIcon } from "lucide-react";
import { Navbar } from "../_components/navbar";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { AcquiredPlanButton } from "./_components/acquired-plan-button";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Badge } from "../_components/ui/badge";

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const user = await clerkClient.users.getUser(userId);

  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan == "premium";

  return (
    <main>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold">Assinatura</h1>

        <div className="flex flex-col gap-6 md:flex-row">
          <Card className="w-[451px]">
            <CardHeader className="relative">
              {!hasPremiumPlan && (
                <Badge
                  variant={"outline"}
                  className="absolute left-1 top-4 text-xs text-success_green"
                >
                  Atual
                </Badge>
              )}
              <p className=""></p>
              <h2 className="text-center text-3xl font-bold">Plano Básico</h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-5xl font-semibold">0</span>
                <span className="text-5=2xl">Mês</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-5 py-6">
              <li className="flex items-center gap-2">
                <CheckIcon className="text-success_green" />
                Apenas 10 transações por mês (7/10)
              </li>
              <li className="flex items-center gap-2">
                <XIcon className="text-secondary-foreground" />
                Relatorio de IA
              </li>
              <li className="flex items-center gap-2">...</li>
            </CardContent>
          </Card>

          {/* Plano Pro IA */}
          <Card className="w-[455px]">
            <CardHeader className="relative py-8">
              {hasPremiumPlan && (
                <Badge
                  variant={"outline"}
                  className="absolute left-1 top-4 text-xs text-success_green"
                >
                  Premium Ativo
                </Badge>
              )}
              {/* <p className="text-success_green">Plano Premium</p> */}
              <h2 className="text-center text-3xl font-bold">Plano Premium</h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-5xl font-semibold">19</span>
                <span className="text-5=2xl">Mês</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-5 py-6">
              <li className="flex items-center gap-2">
                <CheckIcon className="text-success_green" />
                Transações ilimitadas
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="text-success_green" />
                Relatorio de IA
              </li>
              <li className="flex items-center gap-2">...</li>
              <AcquiredPlanButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default SubscriptionPage;
