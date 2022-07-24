import type { ITableRow } from '../interfaces';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const getAllRows = async (): Promise<ITableRow[]> => {
  try {
    const result = await fetch(`${API_URL}/get-cities`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (result.status === 200) {
      const json = await result.json();
      return json;
    } else {
      throw new Error();
    }
  } catch (e: any) {
    throw e;
  }
};
