import { prisma } from '../config/db.js';

export const getAllPractitioners = async () => {
  return prisma.practitioner.findMany();
};

export const getPractitionersByClinic = async (clinicId: bigint) => {
  return prisma.practitionerClinic.findMany({
    where: { clinicId },
    include: { practitioner: true },
  });
};