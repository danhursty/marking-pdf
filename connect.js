import { PineconeClient } from "@pinecone-database/pinecone";      

const pinecone = new PineconeClient();      
await pinecone.init({      
	environment: "gcp-starter",      
	apiKey: "620ca42b-b8ed-46f6-b3a4-7a7242e90093 ",      
});      
const index = pinecone.Index("tutor-marking");