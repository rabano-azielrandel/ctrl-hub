import Main from "@/component/sections/projects/main";
import { ProjectPanel } from "@/component/sections/projects/projects";
import { getProjects } from "@/app/actions/projectActions";

const projects = getProjects();
console.log("projects: ", projects);

export default function Projects() {
  return (
    <div className="flex">
      <Main />
      <ProjectPanel />
    </div>
  );
}
