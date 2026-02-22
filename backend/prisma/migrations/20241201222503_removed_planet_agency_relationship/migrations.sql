/*
  Warnings:

  - You are about to drop the `travel_agency_planet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "travel_agency_planet" DROP CONSTRAINT "travel_agency_planet_planet_id_fkey";

-- DropForeignKey
ALTER TABLE "travel_agency_planet" DROP CONSTRAINT "travel_agency_planet_travel_agency_id_fkey";

-- DropTable
DROP TABLE "travel_agency_planet";
