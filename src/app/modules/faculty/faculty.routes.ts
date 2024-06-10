import { Router } from "express";
import { FacultyControllers } from "./faculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import { FacultyValidations } from "./faculty.validation";

const router = Router();

router.get("/", FacultyControllers.getAllFaculties);
router.get("/:id", FacultyControllers.getSingleFaculty);
router.patch(
    "/:id",
    validateRequest(FacultyValidations.FacultyUpdatationValidationSchema),
    FacultyControllers.updateFaculty
);
router.delete("/:id", FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
