import * as request from 'request-promise';

export async function getDockerfile(type: string) {
  const contents = await request.get(
    `https://api.github.com/repos/adisreyaj/dockerfiles/contents/${type}/Dockerfile`,
    {
      headers: {
        'User-Agent': 'CICD Assitant',
      },
    },
  );
  const dockerfile = await request.get(JSON.parse(contents).download_url);
  return dockerfile;
}
