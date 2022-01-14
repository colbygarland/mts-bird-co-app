import { Handler } from '@netlify/functions';
import { writeData } from '../../lib/sheets';

const handler: Handler = async (event, _context) => {
  const data = JSON.parse(event.body as string);
  const response = await writeData(data.cell, data.data);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export { handler };
