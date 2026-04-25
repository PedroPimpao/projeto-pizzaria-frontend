import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const user = await getUser();
    if (!user) {
      redirect('/login');
    }
  return (
    <div className="text-white">
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
