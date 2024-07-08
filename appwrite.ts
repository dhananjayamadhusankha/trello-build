import { Account, Client, Databases, Storage, ID } from "appwrite";

const client = new Client();
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(projectId!);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { account, databases, storage, ID };
