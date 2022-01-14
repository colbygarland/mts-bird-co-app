import { Handler } from '@netlify/functions';
import { writeData } from '../../lib/sheets';

const handler: Handler = async (event, context) => {
  const response = await writeData('Q2', '1');
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export { handler };
