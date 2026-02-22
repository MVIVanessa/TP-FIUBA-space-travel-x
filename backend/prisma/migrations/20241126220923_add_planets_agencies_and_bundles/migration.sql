-- CreateEnum
CREATE TYPE "Danger" AS ENUM ('NONE', 'LOW', 'MODERATE', 'HIGH', 'EXTREME', 'X_X');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('DOLLAR', 'EURO', 'PESINHO', 'QUARK_BITS', 'GRAV_COINS', 'TIME_CHIPS', 'VOID_MARKS', 'SOUL_CREDITS', 'DON_SATURN');

-- CreateEnum
CREATE TYPE "FlightClass" AS ENUM ('ECONOMIC', 'FIRST', 'EXECUTIVE', 'GALACTIC_EMPEROR', 'COSMIC_BARREL');

-- CreateEnum
CREATE TYPE "Season" AS ENUM ('SUMMER', 'SWINTER', 'WINTER', 'WAUTUMN', 'AUTUMN', 'ASPRING', 'SPRING', 'SPRUMMER', 'VOID');

-- CreateTable
CREATE TABLE "planet" (
    "planet" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "earth_distance" BIGINT NOT NULL,
    "weather" TEXT NOT NULL,
    "gravity" DECIMAL(65,30) NOT NULL,
    "danger_level" "Danger" NOT NULL,
    "inhabited" BOOLEAN NOT NULL,
    "image_url" TEXT,

    CONSTRAINT "planet_pkey" PRIMARY KEY ("planet")
);

-- CreateTable
CREATE TABLE "travel_agency" (
    "travel_agency" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "about_us" TEXT NOT NULL,
    "accepted_currency" "Currency"[] DEFAULT ARRAY[]::"Currency"[],
    "telephone" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "rating" DECIMAL(65,30) NOT NULL,
    "logo_url" TEXT,

    CONSTRAINT "travel_agency_pkey" PRIMARY KEY ("travel_agency")
);

-- CreateTable
CREATE TABLE "travel_bundle" (
    "travel_bundle" BIGSERIAL NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "duration" TEXT NOT NULL,
    "activities" TEXT NOT NULL,
    "flight_class" "FlightClass" NOT NULL,
    "all_inclusive" BOOLEAN NOT NULL,
    "season" "Season" NOT NULL,
    "images_urls" TEXT[],
    "agency_id" BIGINT NOT NULL,
    "planet_id" BIGINT NOT NULL,

    CONSTRAINT "travel_bundle_pkey" PRIMARY KEY ("travel_bundle")
);

-- CreateTable
CREATE TABLE "travel_agency_planet" (
    "travel_agency_id" BIGINT NOT NULL,
    "planet_id" BIGINT NOT NULL,

    CONSTRAINT "travel_agency_planet_pkey" PRIMARY KEY ("travel_agency_id","planet_id")
);

-- AddForeignKey
ALTER TABLE "travel_bundle" ADD CONSTRAINT "travel_bundle_agency_id_fkey" FOREIGN KEY ("agency_id") REFERENCES "travel_agency"("travel_agency") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel_bundle" ADD CONSTRAINT "travel_bundle_planet_id_fkey" FOREIGN KEY ("planet_id") REFERENCES "planet"("planet") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel_agency_planet" ADD CONSTRAINT "travel_agency_planet_travel_agency_id_fkey" FOREIGN KEY ("travel_agency_id") REFERENCES "travel_agency"("travel_agency") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel_agency_planet" ADD CONSTRAINT "travel_agency_planet_planet_id_fkey" FOREIGN KEY ("planet_id") REFERENCES "planet"("planet") ON DELETE CASCADE ON UPDATE CASCADE;
