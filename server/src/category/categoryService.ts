import { Category } from '@prisma/client';
import { prisma } from '../../prisma/prisma'; // Importing the shared Prisma instance
import { CategoryDto } from './categoryDto';
import { NotFoundError } from '../errors';

export class CategoryService {

    public async getCategories(): Promise<Category[]> {
        return await prisma.category.findMany();
    }

    public async getCategory(categoryId: number): Promise<Category | null> {
        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        });
        if (!category) {
            throw new NotFoundError(`Category with id ${categoryId} not found`);
        }
        
        return category
    }

    public async createCategory(category: CategoryDto, userId: string): Promise<Category> {
        return await prisma.category.create({
            data: {
                name: category.name,
                description: category.description,
                userId: userId
            }
        });
    }

    public async updateCategory(categoryId: number, categoryData: CategoryDto): Promise<Category | null> {
        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        });
        if (!category) {
            throw new NotFoundError(`Category with id ${categoryId} not found`);
        }

        return await prisma.category.update({
            where: { id: categoryId },
            data: categoryData,
        });
    }

    public async deleteCategory(categoryId: number): Promise<void> {
        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        });
        if (!category) {
            throw new NotFoundError(`Category with id ${categoryId} not found`);
        }
        
        await prisma.category.delete({
            where: { id: categoryId },
        });
    }
}