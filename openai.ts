// const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

// async function main() {
//   const azureApiKey = process.env.AZURE_API_KEY;
//   const endpoint = process.env.AZURE_ENDPOINT;
//   const deploymentName = process.env.AZURE_DEPLOYMENT_NAME;

//   if (
//     azureApiKey === undefined ||
//     endpoint === undefined ||
//     deploymentName === undefined
//   ) {
//     console.error("Azure credentials not set");
//     return {
//       sender: "",
//       response: "No Azure credentials",
//     };
//   }

//   const client = new OpenAIClient(
//     endpoint,
//     new AzureKeyCredential(azureApiKey)
//   );
// }

// main().catch((err) => {
//   console.error("The sample encountered an error:", err);
// });

// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);
// export default openai;

// openai.ts
// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey: process.env.AZURE_OPENAI_KEY,
//   azure: {
//     endpoint: process.env.AZURE_OPENAI_ENDPOINT,
//     deployment: process.env.AZURE_OPENAI_MODEL_DEPLOYMENT_NAME,
//     apiVersion: '2023-03-15-preview'
//   },
// });

// const openai = new OpenAIApi(configuration);
// export default openai;
