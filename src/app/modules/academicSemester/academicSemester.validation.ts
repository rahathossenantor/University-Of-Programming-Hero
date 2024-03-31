import { z } from "zod";
import { academicSemesterCodes, academicSemesterNames, months } from "./academicSemester.constants";

export const AcademicSemesterCreationValidationSchema = z.object({
    body: z.object({
        name: z.enum([...academicSemesterNames] as [string, ...string[]]),
        code: z.enum([...academicSemesterCodes] as [string, ...string[]]),
        year: z.string(),
        startMonth: z.enum([...months] as [string, ...string[]]),
        endMonth: z.enum([...months] as [string, ...string[]])
    })
});

export const AcademicSemesterValidations = {
    AcademicSemesterCreationValidationSchema
};
