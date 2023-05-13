import { projectState } from "../State/Project";
import { autoBind } from "../utils/Decorator";
import { ValidationObject, validate } from "../utils/Validation";
import { Component } from "./BaseComponent";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    descriptionElement: HTMLTextAreaElement;
    titleElement: HTMLInputElement;
    peopleElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, "user-input");

        this.descriptionElement = this.element.querySelector('#description') as HTMLTextAreaElement;
        this.titleElement = this.element.querySelector('#title') as HTMLInputElement;
        this.peopleElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleElement.value;
        const enteredDescription = this.descriptionElement.value;
        const enteredPeople = this.peopleElement.value;

        const descriptionValidationObject: ValidationObject = { value: enteredDescription, required: true, minLength: 5 };
        const titleValidationObject: ValidationObject = { value: enteredTitle, required: true };
        const peopleValidationObject: ValidationObject = { value: enteredPeople, required: true, min: 0, max: 5 };

        if (!validate(descriptionValidationObject) || !validate(titleValidationObject) || !validate(peopleValidationObject)) {
            alert("Invalid inputs");
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }

    }

    private clearInputs() {
        this.titleElement.value = '';
        this.descriptionElement.value = '';
        this.peopleElement.value = '';
    }

    @autoBind
    private submitHandler(event: SubmitEvent) {
        event.preventDefault();
        const userInput = this.gatherUserInput();

        if (Array.isArray(userInput)) {
            projectState.addProject(...userInput);
            this.clearInputs();
        }
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() {
        
    }
}