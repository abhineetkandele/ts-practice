export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
        this.hostElement = document.getElementById(hostElementId) as T;
        this.templateElement = document.getElementById(templateId) as HTMLTemplateElement;

        const content = document.importNode(this.templateElement.content, true);
        this.element = content.firstElementChild as U;
        if (newElementId) {
            this.element.id = newElementId;
        }

        this.attach(insertAtStart);
    }

    private attach(insertAtStart: boolean) {
        this.hostElement.insertAdjacentElement(
            insertAtStart ? 'afterbegin' : 'beforeend',
            this.element
        );
    }

    abstract configure(): void;
    abstract renderContent(): void;
}