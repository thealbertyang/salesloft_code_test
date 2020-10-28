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

  //Only grab first name, last name, email and job title
  const reducer = (acc, person) => {
    acc.push({
      first_name: person.first_name, 
      last_name: person.last_name,
      email_address: person.email_address,
      title: person.title
    })

    return acc
  }

  const data = json.data.reduce(reducer, [])

  res.statusCode = 200;
  res.json(data);
}
