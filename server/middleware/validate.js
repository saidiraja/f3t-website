// server/middleware/validate.js
export function validate(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body ?? {});
      next();
    } catch (e) {
      const issues = e?.issues?.map(i => `${i.path.join('.')}: ${i.message}`) ?? [];
      return res.status(400).json({ error: 'Validation failed', issues });
    }
  };
}
