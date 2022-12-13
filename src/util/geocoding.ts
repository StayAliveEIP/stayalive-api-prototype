import axios from 'axios';
import any = jasmine.any;

export async function  getCoordinatesFromAdress(adress: string) {

  let data : object = {};

  data = await fetch('http://api.positionstack.com/v1/forward?access_key=' + process.env.GEOCODE_API_KEY + '&query=' + adress,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(r => r.json()).then(r =>
  {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return r;
  },
  );
  return data;
}
