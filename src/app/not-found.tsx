import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <Logo />
      <h1 className="text-2xl font-bold">[404] Página não encontrada</h1>
      <Link href={'/dashboard'}>
        <Button className="cursor-pointer"> Voltar para Home </Button>
      </Link>
    </div>
  );
};

export default NotFound;
