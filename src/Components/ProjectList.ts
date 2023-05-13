import { Project, ProjectStatus, projectState } from "../State/Project";
import { DropTarget } from "../interfaces/DragDrop";
import { autoBind } from "../utils/Decorator";
import { Component } from "./BaseComponent";
import { ProjectItem } from "./ProjectItem";

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DropTarget {
    private projects: Project[] = [];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);

        this.configure();
        this.renderContent();
    }

    @autoBind
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer?.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
    }

    @autoBind
    dragLeaveHandler(_: DragEvent): void {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }

    @autoBind
    dropHandler(event: DragEvent): void {
        const projId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(projId, this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED);
    }

    private renderProjects() {
        const host = document.getElementById(`${this.type}-projects-list`) as HTMLUListElement;

        host.innerHTML = '';
        this.projects.forEach(project => {
            new ProjectItem(`${this.type}-projects-list`, project);
        })
    }

    configure() {
        projectState.addListener((projects) => {
            this.projects = projects.filter(project => {
                if (this.type === 'active') {
                    return project.state === ProjectStatus.ACTIVE;
                }
                return project.state === ProjectStatus.FINISHED;
            })
            this.renderProjects();
        })
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
    }

    renderContent() {
        this.element.querySelector('h2')!.innerText = `${this.type.toUpperCase()} PROJECTS`;
        this.element.querySelector('ul')!.id = `${this.type}-projects-list`;
    }
}