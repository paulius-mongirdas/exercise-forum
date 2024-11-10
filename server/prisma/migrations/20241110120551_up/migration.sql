-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "userId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "userId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "exercises" ALTER COLUMN "userId" DROP DEFAULT;
