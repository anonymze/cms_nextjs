import {
  responseGithubAuthLogic,
  verifyGithubEnvVariables,
} from "./_services/github";
import { NextRequest } from "next/server";
import {
  responseGoogleAuthLogic,
  verifyGoogleEnvVariables,
} from "./_services/google";
import { verifyClerkEnvVariables } from "./_services/clerk";

export async function GET(
  req: NextRequest,
  { params }: { params: { service: string } }
) {
  // we get the service from the URL params
  const [service] = params.service;

  if (!service) {
    return new Response("No service OAuth provided");
  }

  try {
    return verifyEnvVariablesAndReturnResponse(service, req);
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 500 });
    return new Response("Something went wrong", { status: 500 });
  }
}

function verifyEnvVariablesAndReturnResponse(
  service: string,
  req: NextRequest
) {
  verifyClerkEnvVariables();

  switch (service) {
    case "github":
      verifyGithubEnvVariables();
      return responseGithubAuthLogic(req);
    case "google":
      verifyGoogleEnvVariables();
      return responseGoogleAuthLogic(req);
    default:
      return new Response("Service OAuth not handled", { status: 500 });
  }
}
