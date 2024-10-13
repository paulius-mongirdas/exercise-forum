export interface CategoryDto {
    /**
     * Title of a category
     */
    title: string;

    /**
     * Description for a category
     */
    description: string;

    /**
     * URL for an image visualizing a category 
     */
    image_url?: string;
}