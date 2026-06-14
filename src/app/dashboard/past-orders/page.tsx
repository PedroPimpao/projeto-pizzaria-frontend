import { PastOrders } from '@/components/dashboard/pastOrders';
import { getToken } from '@/lib/auth';

const PastOrdersPage = async () => {
  const token = await getToken();

  return (
    <>
      <PastOrders token={token!} />
    </>
  );
};

export default PastOrdersPage;
