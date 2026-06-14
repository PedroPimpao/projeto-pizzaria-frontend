import CategoryCard from '@/components/dashboard/category-card';
import CategoryForm from '@/components/dashboard/category-form';
import PageTitle from '@/components/pageTitle';
import { apiClient } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { Category } from '@/lib/types';

const Categories = async () => {
  const token = await getToken();
  const categories = await apiClient<Category[]>('/categories', {
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
            <CategoryCard
              key={category.id}
              category_id={category.id}
              category_name={category.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
