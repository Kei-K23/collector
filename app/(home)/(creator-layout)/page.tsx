import { Separator } from "@/components/ui/separator";
import CreateFormSection from "./_components/create-form-section";
import RecentFormSection from "./_components/recent-form-section";

export default function Home() {
  return (
    <div className="pt-20 px-4 md:px-16 lg:px-24">
      <CreateFormSection />
      <Separator className="w-full h-[1px]" />
      <RecentFormSection />
    </div>
  );
}
