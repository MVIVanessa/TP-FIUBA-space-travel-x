/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `planet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `travel_agency` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "planet_name_key" ON "planet"("name");

-- CreateIndex
CREATE UNIQUE INDEX "travel_agency_name_key" ON "travel_agency"("name");
