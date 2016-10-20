//@flow

const API_URL = 'https://api.dribbble.com/v1/';
const ACCESS_TOKEN = '8d9bd601f9461955b330d88c44f2930257364de98cddc2064d93cdcb300cb91d';

function fetchData(URL) {
	return fetch(URL, {
		headers: {
			'Authorization': `Bearer ${ACCESS_TOKEN}`
		}
	}).then((response) => response.json());
}

export function getShotsByType(type: string, pageNum: ?number) {
<<<<<<< HEAD
    let URL = `${API_URL}shots/?list=${type}`;
    if (pageNum) {
        URL += `&per_page=20&page=${pageNum}`;
    }
=======
	let URL = `${API_URL}shots/?list=${type}`;
	if (pageNum) {
		URL += `&per_page=20&page=${pageNum}`;
	}
>>>>>>> origin/dev

	return fetchData(URL);
}

export function getResources(URL: ?string) {
	return fetchData(URL);
}
