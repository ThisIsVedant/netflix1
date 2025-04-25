import { NextApiRequest, NextApiResponse } from 'next';
import axios from '../../utils/axios';
import { Media, MediaType } from '../../types';
import { parse } from '../../utils/apiResolvers';

interface Response {
  type: 'Success' | 'Error';
  data: Media[] | Error;
}

const apiKey = '5bac98b706c4d2431fa57d69d376c6bf';

export default async function handler(request: NextApiRequest, response: NextApiResponse<Response>) {
  const { type, time } = request.query;

  try {
    const result = await axios().get(`/trending/${type}/${time}`, {
      params: {
        api_key: apiKey,
        watch_region: 'US'
      }
    });
    const data = parse(result.data.results, type as MediaType);

    response.status(200).json({ type: 'Success', data });
  } catch (error) {
    console.error(error);
    response.status(500).json({ type: 'Error', data: new Error('Unexpected error') });
  }
}
