/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `appointment_slots` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `appointments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clinic_staff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clinics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `partners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `practitioner_clinics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `practitioners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shipments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `status_shares` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `test_kits` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `test_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_current_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_verifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserStatusNew" AS ENUM ('VERIFIED', 'UNVERIFIED', 'PENDING');

-- CreateEnum
CREATE TYPE "TestStatus" AS ENUM ('PENDING', 'VALIDATED', 'REJECTED');

-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('ONLINE', 'PHYSICAL');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('SHARE', 'CONSULTATION', 'ORDER', 'UPLOAD');

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "appointment_slots" DROP CONSTRAINT "appointment_slots_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "appointment_slots" DROP CONSTRAINT "appointment_slots_practitioner_id_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_slot_id_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "clinic_staff" DROP CONSTRAINT "clinic_staff_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "clinic_staff" DROP CONSTRAINT "clinic_staff_user_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_order_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_test_kit_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_fkey";

-- DropForeignKey
ALTER TABLE "partners" DROP CONSTRAINT "partners_received_by_user_id_fkey";

-- DropForeignKey
ALTER TABLE "partners" DROP CONSTRAINT "partners_shared_by_user_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_appointment_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_order_id_fkey";

-- DropForeignKey
ALTER TABLE "practitioner_clinics" DROP CONSTRAINT "practitioner_clinics_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "practitioner_clinics" DROP CONSTRAINT "practitioner_clinics_practitioner_id_fkey";

-- DropForeignKey
ALTER TABLE "practitioners" DROP CONSTRAINT "practitioners_user_id_fkey";

-- DropForeignKey
ALTER TABLE "shipments" DROP CONSTRAINT "shipments_order_id_fkey";

-- DropForeignKey
ALTER TABLE "status_shares" DROP CONSTRAINT "status_shares_recipient_user_id_fkey";

-- DropForeignKey
ALTER TABLE "status_shares" DROP CONSTRAINT "status_shares_sender_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_current_status" DROP CONSTRAINT "user_current_status_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_profile" DROP CONSTRAINT "user_profile_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_verifications" DROP CONSTRAINT "user_verifications_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "user_verifications" DROP CONSTRAINT "user_verifications_test_type_id_fkey";

-- DropForeignKey
ALTER TABLE "user_verifications" DROP CONSTRAINT "user_verifications_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_verifications" DROP CONSTRAINT "user_verifications_verified_by_user_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "name",
DROP COLUMN "role",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "expiryDate" TIMESTAMP(3),
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "status" "UserStatusNew" NOT NULL DEFAULT 'UNVERIFIED',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "appointment_slots";

-- DropTable
DROP TABLE "appointments";

-- DropTable
DROP TABLE "clinic_staff";

-- DropTable
DROP TABLE "clinics";

-- DropTable
DROP TABLE "order_items";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "partners";

-- DropTable
DROP TABLE "payments";

-- DropTable
DROP TABLE "practitioner_clinics";

-- DropTable
DROP TABLE "practitioners";

-- DropTable
DROP TABLE "shipments";

-- DropTable
DROP TABLE "status_shares";

-- DropTable
DROP TABLE "test_kits";

-- DropTable
DROP TABLE "test_types";

-- DropTable
DROP TABLE "user_current_status";

-- DropTable
DROP TABLE "user_profile";

-- DropTable
DROP TABLE "user_verifications";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "AppointmentSlotMode";

-- DropEnum
DROP TYPE "AppointmentStatus";

-- DropEnum
DROP TYPE "ClinicStaffRole";

-- DropEnum
DROP TYPE "OrderStatus";

-- DropEnum
DROP TYPE "PartnerStatus";

-- DropEnum
DROP TYPE "PaymentStatus";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "ShipmentStatus";

-- DropEnum
DROP TYPE "UserStatus";

-- DropEnum
DROP TYPE "VerificationStatus";

-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "testResults" TEXT,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" "TestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "regNo" TEXT NOT NULL,
    "paymentRate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clinic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "availableTime" TEXT NOT NULL,

    CONSTRAINT "Clinic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "clinicId" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "sessionType" "SessionType" NOT NULL DEFAULT 'ONLINE',
    "cost" DOUBLE PRECISION NOT NULL DEFAULT 3600.00,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "testKitId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveryAddress" TEXT NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestKit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "TestKit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerShare" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiryDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerShare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClinicToDoctor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClinicToDoctor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Test_testId_key" ON "Test"("testId");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_regNo_key" ON "Doctor"("regNo");

-- CreateIndex
CREATE INDEX "_ClinicToDoctor_B_index" ON "_ClinicToDoctor"("B");

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_testKitId_fkey" FOREIGN KEY ("testKitId") REFERENCES "TestKit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerShare" ADD CONSTRAINT "PartnerShare_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerShare" ADD CONSTRAINT "PartnerShare_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToDoctor" ADD CONSTRAINT "_ClinicToDoctor_A_fkey" FOREIGN KEY ("A") REFERENCES "Clinic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToDoctor" ADD CONSTRAINT "_ClinicToDoctor_B_fkey" FOREIGN KEY ("B") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
