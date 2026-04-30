import Main from "@/component/sections/projects/main";
import { ProjectPanel } from "@/component/sections/projects/projects";
import {
  getProjects,
  getProjectsRows,
  getProjectsCardRows,
} from "@/app/actions/projectActions";

const projectPanelData = await getProjects();
const projectRows = await getProjectsRows();
const projectCardRows = await getProjectsCardRows();

export default function Projects() {
  return (
    <div className="flex">
      <Main getProjectsRows={getProjectsRows} />
      <ProjectPanel />
    </div>
  );
}
