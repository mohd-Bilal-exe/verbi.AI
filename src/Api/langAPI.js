export const getLanguagesWithFlags = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const languageFlags = {};

    data.forEach((country) => {
      const flag = country.flags.png;
      const languages = country.languages;

      if (languages) {
        Object.values(languages).forEach((language) => {
          if (!languageFlags[language]) {
            languageFlags[language] = flag;
          }
        });
      }
    });

    // Convert to array of objects
    const languagesWithFlags = Object.keys(languageFlags).map((language) => ({
      language: language,
      flag: languageFlags[language],
    }));

    // Sort alphabetically by language
    languagesWithFlags.sort((a, b) => a.language.localeCompare(b.language));
    return languagesWithFlags;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
