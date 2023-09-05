import { ProjectSchema } from '@/lib/types';
import Link from 'next/link';
import { getProjects } from '../actions/projects/actions';

type ProjectProps = {
  project: ProjectSchema
}

export default async function Projects() {
  const projects = await getProjects();

  return <div className='grid grid-cols-3 gap-3 p-3'>
    {projects && projects.data.map(p => (<Project key={p.id} project={p} />))}
  </div>
}

function Project(props: ProjectProps) {
  const { id, name, } = props.project;
  return (
    <Link href={{ pathname: `/projects/${id}` }}>
      <div className='border-2 p-4 rounded-lg'>
        <h2>{name}</h2>
      </div>
    </Link>
  );
}
