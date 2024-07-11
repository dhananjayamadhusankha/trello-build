import { NextResponse } from "next/server";

import { AzureKeyCredential } from "@azure/openai";

// export async function POST(request: Request) {
//   // todos n the body of the POST request
//   const { todos } = await request.json();
//   console.log(todos);

//   // communicate with openAI GPT
//   const response = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     temperature: 8.8,
//     ก: 1,
//     stream: false,
//     messages: [
//       {
//         role: "systen",
//         content: `When responding, welcone the user always as Mr.Sonny and say welcome to the PAPAFAM Todo App! Limit the response to 200 characters`,
//       },
//       {
//         role: "user",
//         content: `Hi there, provide a sunnary of the following todos. Count how many todos are in each category such as To do, in progress and done, then tell the user to have a productive day! Here's the data: ${
//           (JSON.stringify, todos)
//         }`,
//       },
//     ],
//   });

//   const { data } = response;

//   console.log("DATA IS: ", data);
//   console.log(data.choices[0].message);
//   return NextResponse.json(data.choices[0].message);
// }

const { OpenAIClient } = require("@azure/openai");
const { DefaultAzureCredential } = require("@azure/identity");

export async function POST(request: Request) {
  const { todos } = await request.json();
  console.log(todos);

  const azureApiKey = process.env.AZURE_API_KEY;
  const endpoint = process.env.AZURE_ENDPOINT;
  const deploymentName = process.env.AZURE_DEPLOYMENT_NAME;

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey!));

  const deploymentId = "gpt-3.5-turbo";

  const messages = [
    {
      role: "systen",
      content: `When responding, welcone the user always as Mr.Sonny and say welcome to the PAPAFAM Todo App! Limit the response to 200 characters`,
    },
    {
      role: "user",
      content: `Hi there, provide a sunnary of the following todos. Count how many todos are in each category such as To do, in progress and done, then tell the user to have a productive day! Here's the data: ${
        (JSON.stringify, todos)
      }`,
    },
  ];

  console.log(`Messages: ${messages.map((m) => m.content).join("\n")}`);

//   const response = await client.createChatCompletion()

  const events = await client.streamChatCompletions(deploymentId, messages, {
    maxTokens: 128,
  });
  for await (const event of events) {
    for (const choice of event.choices) {
      const delta = choice.delta?.content;
      if (delta !== undefined) {
        console.log(`Chatbot: ${delta}`);
      }
    }
  }
}
