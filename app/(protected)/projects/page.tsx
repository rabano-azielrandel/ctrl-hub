import Main from "@/components/sections/projects/main";
import { ProjectPanel } from "@/components/sections/projects/projects";
import {
  getProjects,
  getProjectsRows,
  getProjectsCardRows,
  createTable,
  addRow,
} from "@/app/actions/projectActions";

export default async function Projects() {
  const projectPanelData = await getProjects();

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
