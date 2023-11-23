import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { buttonVariants } from "../ui/button";

const OrderProductSheet = ({ productId }: { productId: string }) => {
  return (
    <Sheet>
      <SheetTrigger className={buttonVariants({ variant: "default" })}>
        Tilaa Nyt
      </SheetTrigger>
      <SheetContent side="bottom" className={cn("overflow-y-auto")}>
        <SheetHeader className={cn("pb-6")}>
          <SheetTitle>Uusi Tuote</SheetTitle>
          <SheetDescription>
            Täytä tuotteen tiedot ja lisää se kauppaan.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default OrderProductSheet;
