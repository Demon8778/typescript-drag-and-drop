//autibind decorator --> it's a function that returns a function
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDesciptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn
        }
    }
    return adjDesciptor;
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleInput: HTMLInputElement;
  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    this.titleInput = this.element.querySelector("#title") as HTMLInputElement;
    this.descriptionInput = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInput = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }

  @autobind
  private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();

      if(Array.isArray(userInput)) {
          const [title, description, people] = userInput;
          console.log(title, description, people);
          this.clearInputs()
      }
  }

  private clearInputs() {
      this.titleInput.value = '';
      this.descriptionInput.value = '';
      this.peopleInput.value = '';
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private gatherUserInput(): [string, string, number] | void {
    const title = this.titleInput.value;
    const description = this.descriptionInput.value;
    const people = this.peopleInput.value;

    if(title.trim().length === 0 || description.trim().length === 0 || people.trim().length === 0) {
        alert('Invalid input, please try again!')
        return;
    } else {
        return [title, description, +people]
    }
  }
}

const prjInput = new ProjectInput();
