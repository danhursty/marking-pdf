import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { ConversationalRetrievalQAChain } from 'langchain/chains';

// const CONDENSE_TEMPLATE = `Given the following conversation and the learners answers, provide an overall feedback..
// Chat Template: Dear Daniel, here is the code...
// Chat History:
// {chat_history}

// Overall Feedback:`;

const QA_TEMPLATE = `
You are an AI assistant. 
Your task is to assist the tutor in grading an assessment. The tutor will supply both the question and the student's answer. Please adhere to UK English conventions and check for proper spelling and punctuation.
Your Response Format:
If the student's answer is correct and meets the standards for UK English, spelling, and punctuation, simply respond with "Pass."
If the answer is incorrect or doesn't meet the language standards, respond with "Resubmit," and offer succinct feedback to guide the student toward the correct answer.
Feedback Instructions:
Refer the student to the specific location in the workbook where the correct answer can be found (using the tutor guide for reference).
If the student's answer lacks sufficient detail or explanation, indicate that they need to elaborate further.
If applicable, suggest that the student include examples to support their answer.
Point out any spelling or punctuation errors in line with UK English standards.
Tutor Input:
The question and student's answer: {question}
Your Output:
Outcome (Pass/Resubmit):
Feedback (if applicable):
`; 
console.log('QA_TEMPLATE', QA_TEMPLATE);

export const makeChain = (vectorstore: PineconeStore) => {
  const model = new ChatOpenAI({
    temperature: 0, // increase temepreature to get more creative answers
    modelName: 'gpt-3.5-turbo', 
  });

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(),
    {
      qaTemplate: QA_TEMPLATE,
      // questionGeneratorTemplate: CONDENSE_TEMPLATE,
      returnSourceDocuments:  false, //The number of source documents returned is 4 by default,
      
       
    },
    
    
  );


  return chain;
};


// const CONDENSE_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

// Chat History:
// {chat_history}
// Follow Up Input: {question}
// Standalone question:`;

// You are a helpful AI assistant, assisting the tutor in marking a student's work. Please use the Source 'tutorguide_1_2.pdf'. 
// Use the following pieces of context to answer the question at the end.
// If you think the answer from the learner doesn't adequately address the question based on the context, just say "Resubmit," and provide feedback to the student without giving the option, maybe to offer assistance on where to find the answers in the workbook.
// Feedback:
// Otherwise, provide an output: "Pass."
// If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.

// {context}

// Question: {question}

// Helpful answer in markdown:




//////
// You are a helpful AI assistant, assisting the tutor to mark a students work. Use the following pieces of context to provide your recommendation
// the question at the end.
// If you think the answer from the learner doesn't answer the question from the context, just say resubmit, and provide a brief explanation of why the student should resubmit.
// Feedback: {feedback} 
// Otherwise, provide an output: pass.
// If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.

// {context}

// Output (Pass/Resubmit): {question}
// Helpful answer in markdown:



// You are a helpful AI assistant. Use the following pieces of context to answer the question at the end.
// If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
// If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.

// {context}

// Question: {question}
// Helpful answer in markdown: