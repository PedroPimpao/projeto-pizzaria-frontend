'use client';

import { Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { deleteProductAction } from '@/app/_actions/products';
import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
  productId: string;
}

const DeleteButton = ({ productId }: DeleteButtonProps) => {
  const router = useRouter();
  const handleDeleteProduct = async () => {
    const result = await deleteProductAction(productId);
    if (result.success) {
      router.refresh();
      return;
    }

    if (result.error !== '') {
      console.log(result);
    }
  };
  return (
    <Button variant={'destructive'} onClick={handleDeleteProduct}>
      <Trash className="h-5 w-5" />
    </Button>
  );
};

export default DeleteButton;
