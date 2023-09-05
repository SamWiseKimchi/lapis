'use server';

import {
  ProjectArraySchema,
  ProjectSchema,
  projectArraySchema,
} from '@/lib/types';

type ProjectResponse = {
  data: ProjectSchema | null;
  errors: Object;
};

type ProjectsResponse = {
  data: ProjectArraySchema;
  errors: Object;
};

const API_ENDPOINT =
  'https://s4lajcdqnnp3yx3xwnk4nstbtm0zcekl.lambda-url.us-east-1.on.aws';

export const getProject: (id: number) => Promise<ProjectResponse> = async (
  id: number,
) => {
  const res = await getProjects();

  const data = res.data.find((d) => d.id == id) || null;
  const errors = res.errors;

  return { data, errors };
};

export const getProjects: () => Promise<ProjectsResponse> = async () => {
  let zodErrors = {};

  const res = await fetch(API_ENDPOINT);
  const data = await res.json();
  const result = projectArraySchema.safeParse(data);

  if (!result.success) {
    // go over ea issue found during parsing
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return { data: [], errors: zodErrors };
  } else {
    // return data otherwise
    return { data: result.data, errors: zodErrors };
  }
};
