export class User {
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    password: string = "";
    role: string = "";
    questions: Array<{id: string, text: string, answer: string}> = []
}
