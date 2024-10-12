import { Category } from '@prisma/client';
import { prisma } from '../../prisma/prisma'; // Importing the shared Prisma instance
import { CategoryDto } from './categoryDto';

export class CategoryService {

    public async getCategories(): Promise<Category[]> {
        try {
            return await prisma.category.findMany();
        }
        catch (error) {
            throw error
        }
    }

    public async getCategory(categoryId: number): Promise<Category | null> {
        return await prisma.category.findFirst({
            where: { id: categoryId },
        });
    }

    public async createCategory(category: CategoryDto): Promise<Category> {
        return await prisma.category.create({
            data: category,
        });
    }

    public async updateCategory(categoryId: number, category: CategoryDto): Promise<Category | null> {
        return await prisma.category.update({
            where: { id: categoryId },
            data: category,
        });
    }

    public async deleteCategory(categoryId: number): Promise<void> {
        await prisma.category.delete({
            where: { id: categoryId },
        });
    }
}