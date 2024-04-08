import Navbar from "@/components/Navbar";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import MaxWidthWrapper from "./dashboard/_Components/maxwidthWrappers";

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen">

      <Navbar />
      <MaxWidthWrapper className="my-12">
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900  sm:text-6xl ">
            Welcome to  {""}
            <span className="text-blue-600">My App</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">

          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 ">
            <Link className={buttonVariants()} href="/auth/login">
              Sign In &rarr;
            </Link>


          </div>
        </div>

        {/* product */}
      </MaxWidthWrapper>
    </main>
  );
}
