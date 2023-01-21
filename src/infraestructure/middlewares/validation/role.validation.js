import { check, validationResult } from "express-validator";

const validatorRoleDTO = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('code').not()
        .isEmpty().withMessage('Code is required')
        .isLength({ min: 1, max: 1 }).withMessage('Max length is 1 char'),
    (req, resp, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.status(400).json({ errors: errors.array() })
        }
        next();
    }
]

export default validatorRoleDTO;
