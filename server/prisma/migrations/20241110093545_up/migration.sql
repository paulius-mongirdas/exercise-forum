-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT '63cc679b-0e0a-4afc-8d99-0b02d8a0556b';

-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT '63cc679b-0e0a-4afc-8d99-0b02d8a0556b';

-- AlterTable
ALTER TABLE "exercises" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT '63cc679b-0e0a-4afc-8d99-0b02d8a0556b';

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
