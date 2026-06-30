'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Edit } from 'lucide-react';
import { Field, FieldLabel, FieldSet } from '../ui/field';
import { Input } from '../ui/input';
import { renameCategoryAction } from '@/app/_actions/categories';
import { useRouter } from 'next/navigation';

interface RenameCategoryFormProps {
  categoryId: string
}

const RenameCategoryForm = ({ categoryId } : RenameCategoryFormProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleRenameCategory = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await renameCategoryAction(formData, categoryId);
    if (result.success) {
      setOpen(false);
      router.refresh();
      return;
    } else {
      console.log(result.error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={'icon'} variant={'outline'} className="bg-app-card border-app-border border">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-app-card border-app-border border p-6 text-white">
        <DialogHeader>
          <DialogTitle>Renomear categoria</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleRenameCategory} className="space-y-4">
          <FieldSet>
            <Field>
              <FieldLabel htmlFor="categoryName">Nome da categoria</FieldLabel>
              <Input
                id="categoryName"
                name="categoryName"
                placeholder="Nome da categoria"
                required
              />
            </Field>
          </FieldSet>
          <Button type="submit" className="w-full">
            Renomear
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameCategoryForm;
