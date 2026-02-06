-- CreateTable
CREATE TABLE "JobPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "applyLink" TEXT NOT NULL,
    "notificationUrl" TEXT,
    "deadline" TEXT NOT NULL,
    "sections" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "salaryCurrency" TEXT DEFAULT 'INR',
    "jobLocationType" TEXT,
    "streetAddress" TEXT,
    "addressLocality" TEXT,
    "addressRegion" TEXT,
    "postalCode" TEXT,
    "addressCountry" TEXT DEFAULT 'IN',

    CONSTRAINT "JobPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobPost_slug_key" ON "JobPost"("slug");
