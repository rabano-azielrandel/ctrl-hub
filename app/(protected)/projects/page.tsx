import Main from "@/components/sections/projects/main";
import { ProjectPanel } from "@/components/sections/projects/projects";
import {
  getProjects,
  getProjectsRows,
  getProjectsCardRows,
  createTable,
  addRow,
} from "@/app/actions/projectActions";

const projectPanelData = await getProjects();

export default function Projects() {
  return (
    <div className="flex h-full overflow-hidden">
      <Main
        getProjectsRows={getProjectsRows}
        getProjectsCardRows={getProjectsCardRows}
        createTable={createTable}
        addRow={addRow}
      />
      <div className="hidden lg:block shrink-0">
        <ProjectPanel project={projectPanelData} />
      </div>
    </div>
  );
}
