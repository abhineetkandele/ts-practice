export enum ProjectStatus { ACTIVE, FINISHED }

export type Project = {
    title: string;
    description: string;
    people: number;
    id: string;
    state: ProjectStatus;
}

type Listener<T> = (projects: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }
    
    addProject(title: string, description: string, people: number) {
        this.projects.push({
            title,
            description,
            people,
            id: Math.random().toString(),
            state: ProjectStatus.ACTIVE,
        })
        this.triggerListeners();
    }

    moveProject(projectId: String, state: ProjectStatus) {
        const project = this.projects.find(project => project.id === projectId);
        if (project?.state !== state) {
            project!.state = state;
            this.triggerListeners();
        }
    }

    private triggerListeners() {
        this.listeners.forEach(listener => listener(this.projects));;
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new ProjectState();
        }
        return this.instance;
    }
}

export const projectState = ProjectState.getInstance();