import Image from "next/image";
import LoginForm from "@/component/forms/LoginForm";

export default function Home() {
  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-[#B67DF2]">
      <Image
        src="/images/hero.png"
        alt="bg"
        fill
        sizes="100vw"
        priority
        className="object-contain"
      />

      <main className="relative z-10 flex flex-1 w-full max-w-3xl justify-center items-center bg-transparent">
        <LoginForm />
      </main>
    </div>
  );
}
