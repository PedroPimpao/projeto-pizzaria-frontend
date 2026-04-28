'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { Field, FieldLabel, FieldSet } from '../ui/field';
import { Input } from '../ui/input';
import { getCategories } from '@/app/_actions/categories';

const CategoryForm = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='mt-4'>
          <Plus className="mr-2 h-5 w-5" />
          Nova categoria
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-app-card border-app-border border text-white p-6">
        <DialogHeader>
          <DialogTitle>Nova categoria</DialogTitle>
          <DialogDescription>
            Crie uma nova categoria para organizar seus produtos
          </DialogDescription>
        </DialogHeader>
        <form action={getCategories} className="space-y-4">
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
            Criar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryForm;
