import { Project } from "../State/Project";
import { Draggable } from "../interfaces/DragDrop";
import { autoBind } from "../utils/Decorator";
import { Component } from "./BaseComponent";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable { 
    constructor(hostId: string, private project: Project) {
        super('single-project', hostId, false, project.id);

        this.configure();
        this.renderContent();
    }

    get persons() {
        if (this.project.people === 1) {
            return '1 Person';
        } else {
            return `${this.project.people} Persons`
        }
    }

    @autoBind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer?.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = "move";
    }

    dragEndHandler(event: DragEvent): void {
        console.log(event.dataTransfer?.getData('text/plain'));
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragStartHandler);
    }

    renderContent() {
        const { title, description } = this.project;
        this.element.innerHTML = `<h2>${title.toUpperCase()}</h2>
                <h3>${this.persons} assigned</h3>
                <p>${description}</p>`;
    }
}