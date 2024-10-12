import { GeminiNano } from "./GeminiNanoHelper";
class Prompt {
   constructor() {}

   async getFAQs(listOfTopics, question) {
    let geminiNano = new GeminiNano()
    let prompt = `Answer the Questions Only related topics which is listed below:\n 
    ${listOfTopics.map((item,i)=> `${i+1} ${item}\n`).join("")}.\n
    The Question is : ${question}\n
    Note : if Question is not relavent topics listed bwlow:\n  ${listOfTopics.map((item,i)=> `${i+1} ${item}\n`)}} Rspond with a "Apology note"`;
    console.log(prompt);
    let result = await geminiNano.prompt(prompt)
    return result;
   }
}

const prompt = new Prompt();
export default prompt