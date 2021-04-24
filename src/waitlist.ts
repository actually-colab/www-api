import type {
  ShallotRawHandler,
  TShallotHttpEvent,
} from "@shallot/rest-wrapper/dist/aws";

import { ShallotAWSRestWrapper } from "@shallot/rest-wrapper";
import createHTTPError from "http-errors";

import dynamodb, { waitlistTableName } from './dynamo';

type TEvent = TShallotHttpEvent<
  unknown,
  unknown,
  unknown,
  { email: string; job?: string; reason?: string }
>;

const _handler: ShallotRawHandler<TEvent> = async ({ body }) => {
  if (body?.email == null) {
    throw new createHTTPError.BadRequest('email must be defined');
  }

  await dynamodb.docClient
    .put({
      Item: {
        email: body.email,
        job: body.job,
        reason: body.reason,
      },
      TableName: waitlistTableName,
    })
    .promise();

  return { message: "success" };
};

export const handler = ShallotAWSRestWrapper(_handler, undefined, {
  HttpErrorHandlerOpts: { catchAllErrors: true },
  HttpCorsOpts: {
    allowHeaders: "Authorization",
    allowedOrigins: [
      "http://localhost:3000",
      "https://actuallycolab.org",
      "https://www.actuallycolab.org",
    ],
  },
});
