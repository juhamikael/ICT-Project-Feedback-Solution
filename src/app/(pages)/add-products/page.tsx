import { FC } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type TAddProductsProps = {
  prop?: string;
  children?: React.ReactNode;
};

const AddProductsForm = ({}) => {
  return <div>AddProducts</div>;
};

const AddProducts: FC<TAddProductsProps> = async ({}) => {
  const { getPermission } = await getKindeServerSession();
  const getPermissionFlag = getPermission("add-products");

  return (
    <MaxWidthWrapper className="pb-8">
      {!getPermissionFlag.isGranted ? (
        <div className="flex justify-center font-black">
          <div className="flex flex-col">
            <div>You have no permission to add products</div>
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Go Back
            </Link>
          </div>
        </div>
      ) : (
        <AddProductsForm />
      )}
    </MaxWidthWrapper>
  );
};

export default AddProducts;
