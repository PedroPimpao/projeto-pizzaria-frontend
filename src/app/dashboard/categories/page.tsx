import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiClient } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { Category } from '@/lib/types';
import { Tags } from 'lucide-react';

const Categories = async () => {
  const token = await getToken();
  const categories = await apiClient<Category[]>('/category', {
    token: token!,
  });
  console.log(categories);
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Categorias</h1>
          <p className="mt-1 text-sm sm:text-base">Organize suas categorias</p>
        </div>
        <Button>Teste</Button>
      </div>
      {categories.length !== 0 && (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {categories.map((category) => (
            <Card
              key={category.id}
              className="bg-app-card border-app-border border text-white transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <Tags className="h-5 w-5" />
                  <span>{category.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-200 text-sm'>ID: {category.id}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
