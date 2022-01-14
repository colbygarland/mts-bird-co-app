import axios from 'axios';

export const updateCell = (cell: string, userId: number) => {
  return axios
    .post('https://mts-bird-co.netlify.app/.netlify/functions/update-google-sheet', {
      cell: `${cell}${userId}`,
      data: 1,
    })
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      console.error(err);
    });
};
