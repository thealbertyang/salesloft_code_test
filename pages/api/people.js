// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const token = process.env.API_KEY;
  const people = await fetch('https://api.salesloft.com/v2/people.json', {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  if(!people.ok){
    res.statusCode = res.response;
    res.json({});
  }

  const json = await people.json();
  res.statusCode = 200;
  res.json(json.data);
}
