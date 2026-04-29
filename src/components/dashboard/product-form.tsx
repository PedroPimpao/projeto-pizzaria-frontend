'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, Upload } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createProductAction } from '@/app/_actions/products';
import { useRouter } from 'next/navigation';
import { Category } from '@/lib/types';
import Image from 'next/image';

interface ProductFormProps {
  categories: Category[];
}

export function ProductForm({ categories }: ProductFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [priceValue, setPriceValue] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  async function handleCreateProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append('category_id', selectedCategory);

    const result = await createProductAction(formData);

    setIsLoading(false);

    if (result.success) {
      setOpen(false);
      setSelectedCategory('');
      router.refresh();
      return;
    } else {
      console.log(result.error);
      alert(result.error);
    }
  }

  const formatToBrl = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (!numbers) return '';
    const amount = parseInt(numbers) / 100;
    return amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatToBrl(e.target.value);
    setPriceValue(formattedValue);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        console.log('A imagem deve ser menor que 5MB');
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand-primary hover:bg-brand-primary font-semibold">
          <Plus className="mr-2 h-5 w-5" />
          Novo produto
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-app-card max-h-[90vh] overflow-y-auto p-6 text-white">
        <DialogHeader>
          <DialogTitle>Criar novo produto</DialogTitle>
          <DialogDescription>Criando novo produto...</DialogDescription>
          <Button variant={'destructive'}>teste</Button>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleCreateProduct}>
          <div>
            <Label htmlFor="name" className="mb-2">
              Nome do produto
            </Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="Digite o nome do produto..."
              className="border-app-border bg-app-background text-white"
            />
          </div>

          <div>
            <Label htmlFor="price" className="mb-2">
              Preço
            </Label>
            <Input
              id="price"
              name="price"
              required
              placeholder="Ex: R$ 35,00"
              className="border-app-border bg-app-background text-white"
              value={priceValue}
              onChange={handlePriceChange}
            />
          </div>

          <div>
            <Label htmlFor="description" className="mb-2">
              Descrição
            </Label>
            <Textarea
              id="description"
              name="description"
              required
              placeholder="Digite a descrição do produto..."
              className="border-app-border bg-app-background min-h-25 text-white"
            />
          </div>

          <div>
            <Label htmlFor="category" className="mb-2">
              Categoria
            </Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory} required>
              <SelectTrigger className="border-app-border bg-app-background text-white">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent className="bg-app-card border-app-border">
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    className="cursor-pointer text-white hover:bg-transparent"
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="file" className="mb-2">
              Imagem do produto
            </Label>
            {imagePreview ? (
              <div className="relative z-10 h-48 w-full overflow-hidden rounded-lg border">
                <Image src={imagePreview} alt="Image preview" fill className="object-cover" />
                <Button
                  type="button"
                  variant={'destructive'}
                  onClick={clearImage}
                  className="absolute top-2 right-2 z-20 bg-red-500 text-white"
                >
                  Excluir
                </Button>
              </div>
            ) : (
              <div className="border-e-app-border flex flex-col items-center justify-center rounded-md border-2 border-dashed p-8">
                <Upload className="mb-2 h-8 w-8 text-gray-400" />
                <Label htmlFor="file">Clique para selecionar uma imagem</Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="image/jpeg, image/jpg, image/png"
                  onChange={handleImageChange}
                  required
                  className="hidden"
                />
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading || !selectedCategory}
            className="bg-brand-primary hover:bg-brand-primary w-full text-white disabled:opacity-50"
          >
            {isLoading ? 'Criando...' : 'Criar produto'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
