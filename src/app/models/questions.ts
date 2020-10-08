export class Question{
    public category: string;
    public type: string;
    public difficulty: string;
    public question: string;
    public correct_answer: string;
    public incorrect_answers: Array<string>;

    public constructor(Category: string, Type: string, Difficulty: string, 
        Question: string, Correct_answer: string, Incorrect_answers: Array<string>){
            this.category = Category;
            this.type = Type;
            this.difficulty = Difficulty;
            this.question = Question;
            this.correct_answer = Correct_answer;
            this.incorrect_answers = Incorrect_answers;
        }
}