// server/schemas.js
import { z } from 'zod';

// helpers
const str = z.string().trim();
const optionalStr = str.max(5000).optional();

// singles
export const homeSchema = z.object({
  title_fr: optionalStr, title_en: optionalStr,
  intro_fr: optionalStr, intro_en: optionalStr
});

export const aboutSchema = z.object({
  mission_fr: optionalStr, mission_en: optionalStr,
  vision_fr:  optionalStr, vision_en:  optionalStr,
  values_fr:  optionalStr, values_en:  optionalStr
});

// collections
export const serviceCreate = z.object({
  unit: str.max(120).default(''),
  name_fr: str.max(160).default(''),
  name_en: str.max(160).default(''),
  description_fr: str.max(2000).default(''),
  description_en: str.max(2000).default('')
});
export const serviceUpdate = serviceCreate.partial();

export const industryCreate = z.object({
  name_fr: str.max(160).default(''),
  name_en: str.max(160).default(''),
  description_fr: str.max(2000).default(''),
  description_en: str.max(2000).default(''),
  image_url: str.max(500).default('')
});
export const industryUpdate = industryCreate.partial();

export const certificationCreate = z.object({
  name: str.max(200).default('')
});
export const certificationUpdate = certificationCreate.partial();

export const clientCreate = z.object({
  name: str.max(200).default(''),
  logo_url: str.max(500).default('')
});
export const clientUpdate = clientCreate.partial();

export const newsCreate = z.object({
  title_fr: str.max(200).default(''),
  title_en: str.max(200).default(''),
  body_fr: str.max(5000).default(''),
  body_en: str.max(5000).default(''),
  image_url: str.max(500).default('')
});
export const newsUpdate = newsCreate.partial();

// NEW: texts (slots)
export const textCreate = z.object({
  page: str.max(50),
  key:  str.max(100),
  fr: optionalStr,
  en: optionalStr
});
export const textUpdate = z.object({
  fr: optionalStr,
  en: optionalStr
});

// NEW: blocks (repeaters)
export const blockItemCreate = z.object({
  page: str.max(50),
  name: str.max(50),
  fr: optionalStr,
  en: optionalStr,
  image_url: optionalStr,
  order: z.number().int().optional()
});
export const blockItemUpdate = z.object({
  fr: optionalStr,
  en: optionalStr,
  image_url: optionalStr,
  order: z.number().int().optional()
});
