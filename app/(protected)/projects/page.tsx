import Main from "@/component/sections/projects/main";
import { ProjectPanel } from "@/component/sections/projects/projects";
import { getProjects, getProjectsRows } from "@/app/actions/projectActions";

const projectPanelData = await getProjects();
const projectRows = await getProjectsRows();
console.log("projects: ", projectRows);

export default function Projects() {
  return (
    <div className="flex">
      <Main />
      <ProjectPanel />
    </div>
  );
}
