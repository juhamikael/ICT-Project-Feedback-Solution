import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { FC } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TDashboardProps = {
  prop?: string;
  children?: React.ReactNode;
};

const Dashboard: FC<TDashboardProps> = ({}) => {
  const btnStyle = "border border-b rounded-none text-white ";
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4">
          <div className="flex flex-col md:h-screen ">
            <h1 className="pb-4 font-black text-2xl underline">
              My Acme valikko
            </h1>
            <Button
              className={cn(
                buttonVariants({ variant: "outline" }),
                btnStyle,
                "rounded-t-xl"
              )}
            >
              Ostoshistoria
            </Button>
            <Button
              className={cn(
                buttonVariants({ variant: "outline" }),
                btnStyle,
                "rounded-b-xl"
              )}
            >
              Tilin Asetukset
            </Button>
          </div>
        </div>
        <div className="border mx-4 my-6 md:my-0"></div>
        <div className="w-3/4">
          <h1 className="pb-4 font-black text-2xl underline">
            Viimeisimmät tapahtumat
          </h1>
          <div>Dashboard</div>
          <div>Dashboard</div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
