export const exerciseOptions =  {
	method: 'GET',
	headers: {
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        'x-rapidapi-key': '3ae68c6450msh8db206cb493953dp1074d7jsn8d498c675d64'
	}
};


export const youtubeOptions = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '3ae68c6450msh8db206cb493953dp1074d7jsn8d498c675d64',
		'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com'
	}
};

export const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};
