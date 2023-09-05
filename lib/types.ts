import { string, z } from 'zod';

export const managementAreasGeoSchema = z
  .object({
    type: z.string(),
    properties: z.object({
      projID: z.string(),
      area_ha: z.number().optional(),
      Area_ha: z.number().optional(),
      Region: z.string().optional(),
      name: z.string().optional(),
      type: z.string().optional(),
      p_area: z.number().optional(),
      P_area: z.number().optional(),
    }),
    geometry: z.object({
      type: z.string(),
      coordinates: z.any(),
    }),
  })
  .array();

// Schema to be used for server validation
export const projectSchema = z
  .object({
    // by default these are required
    id: z.number(),
    name: z.string(),
    address: z.string(),
    phone: z.string(),
    email: z.string(),
    website: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    managementAreasGeoJSON: z.string(),
  })
  // validation
  .refine(
    (data) => {
      // do some validation through parsing managementAreasGeoJSON
      return true;
    },
    {
      message: 'managementAreasGeoJSON is incorrect format',
      path: ['managementAreasGeoJSON'],
    },
  );

export const projectArraySchema = projectSchema.array();

// JS runtime variable
// it takes the signUpSchema and creates a type out of it
// used in useForm in order to make sure that the types and form field names are matching and correct
export type ProjectSchema = z.infer<typeof projectSchema>;
export type ProjectArraySchema = z.infer<typeof projectArraySchema>;
export type ManagementAreasGeoSchema = z.infer<typeof managementAreasGeoSchema>;
