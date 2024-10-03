const githubUsername = 'vinay1408';
const apiUrl = `https://recruiting.verylongdomaintotestwith.ca/api/${githubUsername}/character`;

const DEBUG = true;

export const fetchAllCharacters = async () => {
  try {
    const response = await fetch(apiUrl);
    DEBUG && console.log('API fetchAllCharacters response status:', response.status);
    if (response.ok) {
      const data = await response.json();
      DEBUG && console.log('API fetchAllCharacters data:', data);
      return data.body.body;
    } else {
      DEBUG && console.error('API fetchAllCharacters failed:', response.statusText);
      throw new Error(response.statusText);
    }
  } catch (error) {
    DEBUG && console.error('Error in fetchAllCharacters:', error);
    throw error;
  }
};

export const saveAllCharacters = async (characters) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ body: characters }),
    });
    DEBUG && console.log('API saveAllCharacters response status:', response.status);
    if (!response.ok) {
      DEBUG && console.error('API saveAllCharacters failed:', response.statusText);
      throw new Error(response.statusText);
    } else {
      DEBUG && console.log('Characters saved successfully to API.');
    }
  } catch (error) {
    DEBUG && console.error('Error in saveAllCharacters:', error);
    throw error;
  }
};
