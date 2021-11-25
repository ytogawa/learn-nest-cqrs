-- CreateTable
CREATE TABLE "examples" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "detail" TEXT NOT NULL,

    CONSTRAINT "examples_pkey" PRIMARY KEY ("id")
);
