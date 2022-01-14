import { Handler } from '@netlify/functions';
import { writeData } from '../../lib/sheets';

const handler: Handler = async (event, context) => {
  const fields = JSON.parse(event.body as string);
  const response = await writeData(fields.cell, fields.data);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export { handler };
