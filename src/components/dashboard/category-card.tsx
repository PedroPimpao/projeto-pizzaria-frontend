import { Tags } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import RenameCategoryForm from './rename-category-form';

interface CategoryCardProps {
  category_id: string;
  category_name: string;
}

const CategoryCard = ({ category_id, category_name }: CategoryCardProps) => {
  return (
    <Card className="bg-app-card border-app-border border text-white transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2 text-base md:text-lg">
          <div className="flex items-center gap-2 text-base md:text-lg">
            <Tags className="h-5 w-5" />
            <span>{category_name}</span>
          </div>
          <RenameCategoryForm categoryId={category_id}/>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-400">ID: {category_id}</p>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
