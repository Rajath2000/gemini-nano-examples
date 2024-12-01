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
      let prompt = `User has typed this question :${question} please answer his question if you have the details, if dont send this message "unable to process your question!" give the response in html format`
      console.log(prompt);
      let result = await this.geminiNano.prompt(prompt)
      return result;
   }

   async userMessageAutoComplete(userInput) {
      let prompt = `Given the user’s current query: ${userInput} and context, provide a list of relevant message suggestions or auto-complete options. The suggestions should be concise and related to the topic at hand. Focus on common phrases, only give comma sapareted string so special charates`;
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