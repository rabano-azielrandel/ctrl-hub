import Main from "@/component/sections/projects/main";
import { ProjectPanel } from "@/component/sections/projects/projects";
import {
  getProjects,
  getProjectsRows,
  getProjectsCardRows,
  createTable,
} from "@/app/actions/projectActions";

const projectPanelData = await getProjects();

export default function Projects() {
  return (
    <div className="flex">
      <Main
        getProjectsRows={getProjectsRows}
        getProjectsCardRows={getProjectsCardRows}
        createTable={createTable}
      />
      <ProjectPanel project={projectPanelData} />
    </div>
  );
}
