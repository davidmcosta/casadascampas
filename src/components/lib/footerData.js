// lib/fetchContact.js
import { client } from './sanity';

export async function getContactInfo() {
  const query = `*[_type == "contact"][0]`;
  return await client.fetch(query);
}
