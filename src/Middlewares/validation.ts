import Joi from "joi";
import { Request, Response, NextFunction } from "express";
type SchemaTarget = "Body" | "Params" | "Query";
const validateRequest = (
  schema: Joi.ObjectSchema,
  type: SchemaTarget = "Body"
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const body = req.body || {};
    let dataToValidate;

    switch (type) {
      case "Body":
        dataToValidate = body;
        break;
      case "Params":
        dataToValidate = req.params;
        break;
      case "Query":
        dataToValidate = req.query;
        break;
      default:
        dataToValidate = body;
    }

    const { error, value } = schema.validate(dataToValidate);
    if (error) {
      res.status(422).json({
        success: false,
        message: error.details[0].message,
      });
      return;
    }

    // Update the request object with validated values (with defaults applied)
    // Note: req.query is read-only in Express, so we skip assignment for Query type
    if (type === "Body") {
      req.body = value;
    } else if (type === "Params") {
      req.params = value;
    }

    next();
  };
};

export default validateRequest;
