import fs from 'fs';
import path from 'path';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { ConversationalRetrievalQAChain } from 'langchain/chains';

const filePath = path.join(process.cwd(), 'text-files/feedback.txt');
const textFileContent = fs.readFileSync(filePath, 'utf8');


const FEEDBACK_TEMPLATE = `Given the following conversation and the learners answers, provide an overall feedback on the learners performance.
Use the template to structure your feedback. You can add more text to the template if you wish. Remeber to check for spelling and grammar mistakes.
If they have not used examples from the text, ask them to do so. If they have not used the correct terminology, ask them to do so.

Overall Feedback Template:
${textFileContent}

Chat History:
{chat_history}

Overall Feedback:`;


export const feedback = (vectorstore: PineconeStore) => {
  const model = new ChatOpenAI({
    temperature: 0, // increase temepreature to get more creative answers
    modelName: 'gpt-3.5-turbo', 
  });

  const feedbackchain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(),
    {
      qaTemplate: FEEDBACK_TEMPLATE,
      // questionGeneratorTemplate: CONDENSE_TEMPLATE,
      returnSourceDocuments:  false, //The number of source documents returned is 4 by default,
      
       
    },
    
    
  );

  return feedbackchain;
};