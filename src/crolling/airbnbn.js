const axios = require('axios');
const cheerio = require('cheerio');

const getHTML = async period => {
  try {
    return await axios.get(
      `https://www.airbnb.co.kr/?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&search_mode=flex_destinations_search&location_search=MIN_MAP_BOUNDS&date_picker_type=flexible_dates&source=structured_search_input_header&search_type=filter_change&flexible_trip_lengths%5B%5D=${encodeURI(
        period
      )}`
    );
  } catch (error) {
    throw new Error(error);
  }
};

const parsing = async period => {
  const html = await getHTML(period);
  const $ = cheerio.load(html.data);
  const $contents = $('#site-content');
  // console.log(Object.keys($contents.prevObject));
  console.log(html.data);
  $contents.each((idx, node) => {
    const city = $(node).find('._6tbg2q');
    // console.log(city);
    // const img = $(node).find('._6tbg2q').
  });
};

parsing('one_month');
