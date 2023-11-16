import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AddProductServerComponent from "./AddProcutsServerComponent";
import { cn } from "@/lib/utils";
const AddProductSheet = ({ title }: { title: string }) => {
  return (
    <Sheet>
      <SheetTrigger>{title}</SheetTrigger>
      <SheetContent className={cn("overflow-y-auto")}>
        <SheetHeader className={cn("pb-6")}>
          <SheetTitle>Uusi Tuote</SheetTitle>
          <SheetDescription>
            Täytä tuotteen tiedot ja lisää se kauppaan.
          </SheetDescription>
        </SheetHeader>
        <AddProductServerComponent />
      </SheetContent>
    </Sheet>
  );
};

export default AddProductSheet;
