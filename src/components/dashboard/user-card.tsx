'use client';
import { apiClient } from '@/lib/api';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { changeRole } from '@/app/_actions/role';
import { useRouter } from 'next/navigation';

interface UserCardProps {
  userId: string;
  username: string;
  email: string;
  role: string;
}

const UserCard = ({ userId, username, email, role }: UserCardProps) => {
  const router = useRouter();
  const refreshPage = () => {
    router.refresh();
  };
  const handleAddStaff = async () => {
    changeRole({ userId, role: 'STAFF' });
    refreshPage();
  };

  const handleRoleChange = async (newRole: string) => {
    changeRole({ userId, role: newRole });
    refreshPage();
  };

  const handleRemove = async () => {
    changeRole({ userId, role: 'EXTERNAL' });
    refreshPage();
  };

  return (
    <Card className="bg-app-card border-app-border flex flex-row items-center justify-between gap-2 overflow-hidden border p-4 text-white transition-shadow hover:shadow-md">
      <div>
        <p className="text-lg font-bold">{username}</p>
        <p className="text-md text-gray-300">{email}</p>
        <p className="text-sm font-bold text-gray-500">Cargo: {role}</p>
      </div>

      {role === 'EXTERNAL' ? (
        <Button onClick={handleAddStaff}>Adicionar</Button>
      ) : (
        <div className="flex flex-col gap-2">
          <Select defaultValue={role} onValueChange={handleRoleChange}>
            <SelectTrigger className="border-app-border bg-app-sidebar w-45 cursor-pointer border text-white">
              <SelectValue placeholder="Atualizar cargo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="bg-app-background">
                <SelectItem value="STAFF" className="text-white">
                  STAFF
                </SelectItem>
                <SelectItem value="ADMIN" className="text-white">
                  ADMIN
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            variant={'destructive'}
            defaultValue={'EXTERNAL'}
            type="button"
            onClick={handleRemove}
          >
            Remover
          </Button>
        </div>
      )}
    </Card>
  );
};

export default UserCard;
