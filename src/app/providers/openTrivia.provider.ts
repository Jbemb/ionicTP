import { Injectable } from "@angular/core";
import { Question } from '../models/questions';

@Injectable()
export class OpenTriviaService {

    public getQuestions(questions: number, difficultyLevel: string):
        Promise<Array<Question>> {
        return new Promise((resolve, reject) => {
            resolve([
                {
                    category: "Entertainment: Japanese Anime & Manga",
                    type: "multiple", 
                    difficulty: "easy",
                    question: "In &quot;Fairy Tail&quot;, what is the nickname of Natsu Dragneel?",
                    correct_answer: "The Salamander",
                    incorrect_answers: ["The Dragon Slayer", "The Dragon", "The Demon"]
                },
                {
                    category: "Entertainment: Japanese Anime & Manga",
                    type: "multiple", 
                    difficulty: "easy",
                    question: "Which months have 28 days?",
                    correct_answer: "all of them",
                    incorrect_answers: ["February", "March", "September"]
                },
                {
                    category: "Entertainment: Video Games",
                    type: "boolean", 
                    difficulty: "medium",
                    question: "&quot;Returnto Castle Wolfenstein&quot; was the only game of the Wolfenstein series where you don&#039;t play as William &quot;B.J.&quot; Blazkowicz.",
                    correct_answer: "False",
                    incorrect_answers: ["True"]
                }
            ]);

        });
    }
}