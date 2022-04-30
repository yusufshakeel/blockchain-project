export default function AxiosHttpAction(axiosInstance) {
  const post = async ({
    url,
    requestBody,
    headers = {},
    timeout = 60000,
    responseType = 'json'
  }) => {
    try {
      const response = await axiosInstance({
        method: 'post',
        url,
        data: requestBody,
        timeout,
        responseType,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      });
      return response.data;
    } catch (e) {
      console.error(e);
      return e?.response?.data ?? 'Unknown error';
    }
  };

  const get = async ({ url, headers = {}, timeout = 60000, responseType = 'json' }) => {
    try {
      const response = await axiosInstance({
        method: 'get',
        url,
        timeout,
        responseType,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      });
      return response.data;
    } catch (e) {
      console.error(e);
      return e?.response?.data ?? 'Unknown error';
    }
  };

  return { post, get };
}