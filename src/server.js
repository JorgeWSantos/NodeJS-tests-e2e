import { createServer } from "http";
import { once } from "events";
import { randomUUID } from "crypto";

const Database = new Map();

function respondJson(data, response) {
  return response.end(JSON.stringify(data));
}

async function handler(request, response) {
  const { method } = request;

  if (method === "GET") {
    return respondJson([...Database.values()], response);
  }

  if (method === "POST") {
    const body = JSON.parse(await once(request, "data"));
    console.log("recebido", body);
    const id = randomUUID();
    Database.set(id, body);

    return respondJson({ ok: true }, response);
  }

  if (method === "DELETE") {
    Database.clear();
    return respondJson({ ok: 1 }, response);
  }

  response.end("hello world");
}

export default createServer(handler);
