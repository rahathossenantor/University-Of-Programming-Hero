import { Router } from "express";
import { AdminControllers } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AdminValidations } from "./admin.validation";

const router = Router();

router.get("/", AdminControllers.getAllAdmins);
router.get("/:id", AdminControllers.getSingleAdmin);
router.patch(
    "/:id",
    validateRequest(AdminValidations.AdminUpdatationValidationSchema),
    AdminControllers.updateAdmin
);
router.delete("/:id", AdminControllers.deleteAdmin);

export const AdminRoutes = router;
