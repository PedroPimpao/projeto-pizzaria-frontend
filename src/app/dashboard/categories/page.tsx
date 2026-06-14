import CategoryForm from '@/components/dashboard/category-form';
import PageTitle from '@/components/pageTitle';
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
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
        <PageTitle title="Categorias" subtitle="Organize suas categorias" />
        <CategoryForm />
      </div>
      {categories.length !== 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                <p className="text-sm text-gray-400">ID: {category.id}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
