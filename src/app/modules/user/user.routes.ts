import { Router } from "express";
import { UserControllers } from "./user.controller";
import { StudentValidations } from "../student/student.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
    "/create-student",
    validateRequest(
        StudentValidations.StudentCreationValidationSchema
    ),
    UserControllers.createStudent
);

export const UserRoutes = router;
