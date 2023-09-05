import { getProject } from '@/app/actions/projects/actions';
import { managementAreasGeoSchema } from '@/lib/types';

type ProjectProps = {
  params: { id: number }
}
export default async function Project(props: ProjectProps) {
  const res = await getProject(props.params.id);

  if (!res.data) {
    throw new Error('Could not load project');
  }

  const { name, id, address, phone, email, website, latitude, longitude, managementAreasGeoJSON } = res.data;

  // use this data to generate map image
  const mgmtArea = managementAreasGeoSchema.safeParse(JSON.parse(managementAreasGeoJSON));

  let zodErrors = {}

  if (!mgmtArea.success) {
    // go over ea issue found during parsing
    mgmtArea.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    throw new Error('Build Management Obj');
  }

  return (<div className='flex flex-col'>
    <h3>Name: {name}</h3>
    <h4>Id: {id}</h4>
    <h4>Address: {address}</h4>
    <h4>Phone: {phone}</h4>
    <h4>Email: {email}</h4>
    <h4>Site: {website}</h4>
    <h4>Coordinates: {latitude}, {longitude}</h4>
    <div id='map'>{"I would have included a nice map with polygon displayed over it here."}</div>
    <div className='grid grid-cols-3 gap-3'>
      {mgmtArea.data.map((area, i) => (<div className='border-2 p-4 rounded-lg' key={i}>
        <h3>Management Area</h3>
        <Description title='Project Id' d={area.properties.projID} />
        <Description title='Property Name' d={area.properties.name} />
        <Description title='Type' d={area.type} />
        <Description title='Region' d={area.properties.Region} />
        <Description title='Area' d={area.properties.area_ha || area.properties.Area_ha} />
        <Description title='Property Area' d={area.properties.p_area || area.properties.P_area} />
        <Description title='Geo Type' d={area.geometry.type} />
      </div>))}
    </div>
  </div >);
}

type DescProps = { title: string, d?: string | number }

const Description = (props: DescProps) => {
  return props.d ? <h4>{props.title}: {props.d}</h4> : <></>
}
