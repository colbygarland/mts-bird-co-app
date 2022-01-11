import { google } from 'googleapis';

export interface UserResponseType {
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  quantity: string;
  orderDate: string;
  deposit?: string;
  depositPaid: boolean;
}

export async function getData(): Promise<UserResponseType[] | null> {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      undefined,
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target
    );
    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Form Responses 1', // sheet name
    });
    const rows = response.data.values;
    if (rows?.length) {
      return (
        rows
          // remove any empty rows
          .filter((row) => row[0] != '')
          .map((row) => ({
            createdAt: row[0],
            name: row[1],
            email: row[2],
            phone: row[3],
            quantity: row[4],
            orderDate: row[5],
            deposit: row[7] ?? null,
            depositPaid: row[16],
          }))
          // sort it from most recent
          .reverse()
          // remove the header
          .slice(0, -1)
      );
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}