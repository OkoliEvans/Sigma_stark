//import WalletBar from "@/components/WalletBar";
import Hero from "../components/Hero";
import Business from "../components/Business";
import Works from "../components/Works";
import Features from "../components/Features";

export default function Home() {
  return (
    <main className="">
      <div className="bg-[#f7ebeb] flex justify-center items-start">
        <div className="xl:max-w-[1280px] w-full">
          <Hero />
        </div>
      </div>

      <div className="flex bg-[#f7ebeb] sm:px-16 px-6 justify-center items-start">
        <div className="xl:max-w-[1280px] w-full">
          <Business />

          <Works />
          <Features />
        </div>
      </div>
    </main>
  );
}
