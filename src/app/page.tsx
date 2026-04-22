import { redirect } from "next/navigation";

export default function Home() {
  return (
    // <h1>Hello, World!</h1>
    redirect('/login')
  );
}
