import GeminiNano from "gemini-nano-prompt";

class Prompt {
   constructor() {
      this.geminiNano = new GeminiNano()
   }


   async getFAQs(listOfTopics, question) {
    let prompt = `Answer the Questions Only related topics which is : ${listOfTopics}, The Question is : ${question}, if is not relavent topics: ${listOfTopics} Rspond with a Apology note`;
    console.log(prompt);
    let result = await this.geminiNano.prompt(prompt)
    return result;
   }


   async answerUserQuery(question) {
      let prompt = `Act like a doctor for consulting user queries, User has typed this question :${question} please answer his question if you have the details, if dont send this message "unable to process your question!"`
      console.log(prompt);
      let result = await this.geminiNano.prompt(prompt)
      return result;
   }

   async closeSession(){
      this.geminiNano.closeSession()
   }

}

const prompt = new Prompt();
export default prompt