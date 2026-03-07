import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Motivation {
    message: string;
}
export interface Question {
    correctIndex: bigint;
    answers: Array<string>;
    text: string;
}
export interface backendInterface {
    addMotivation(message: string): Promise<bigint>;
    addQuestion(text: string, answers: Array<string>, correctIndex: bigint): Promise<void>;
    getAllMotivations(): Promise<Array<Motivation>>;
    getAllQuestions(): Promise<Array<Question>>;
    getQuestion(id: bigint): Promise<Question>;
    getRandomMotivation(): Promise<string>;
    isAnswerCorrect(questionID: bigint, submittedAnswerIndex: bigint): Promise<boolean>;
}
