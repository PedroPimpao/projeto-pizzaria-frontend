import UserCard from '@/components/dashboard/user-card';
import PageTitle from '@/components/pageTitle';
import { apiClient } from '@/lib/api';
import { getUser } from '@/lib/auth';
import { User } from '@/lib/types';
import { redirect } from 'next/navigation';

const UsersPage = async () => {
  const myUser = await getUser();
  if (myUser === null) {
    redirect('/login');
  }

  if (myUser.role !== 'SUPER_ADMIN' && myUser.role !== 'USER_ROOT') {
    redirect('/dashboard');
  }

  const users = await apiClient<User[]>('/users');

  return (
    <>
      <div className="mb-4">
        <PageTitle title="Funcionários" subtitle="Gerencie seus funcionários" />
      </div>

      <div className="flex grid-cols-2 flex-col gap-3 md:grid xl:grid-cols-3">
        {users
          .filter(
            (user) => user.id !== myUser.id && user.role !== 'USER_ROOT' && user.role !== 'EXTERNAL'
          )
          .map((user) => (
            <UserCard
              key={user.id}
              userId={user.id}
              username={user.name}
              email={user.email}
              role={user.role}
            />
          ))}
      </div>

      <div className="text-sm sm:text-base text-gray-400 m-4">Fora do quadro de funcionarios</div>
      <div className="flex grid-cols-2 flex-col gap-3 md:grid xl:grid-cols-3">
        {users
          .filter((user) => user.id !== myUser.id && user.role === 'EXTERNAL')
          .map((user) => (
            <UserCard
              key={user.id}
              userId={user.id}
              username={user.name}
              email={user.email}
              role={user.role}
            />
          ))}
      </div>
    </>
  );
};

export default UsersPage;
