export function unique(array, key) {
  return [...new Set(array?.map((x) => x[key]))];
}

export function getURL(filter = {}) {
  const params = new URLSearchParams();
  filter.category && params.append("category", filter.category);
  filter.city && params.append("city", filter.city);
  return `/api/events${params.size ? `?${params}` : ""}`;
}
export function getCategoryURL(filter = {}) {
  const params = new URLSearchParams();
  filter.category && params.append("category", filter.category);
  filter.city && params.append("city", filter.city);
  return `/api/categories${params.size ? `?${params}` : ""}`;
}

export function groupByProperty(objectArray = [], property) {
  // defines an array of unique propertyValues based on an objectArray
  const arrayOfProp = unique(objectArray, `${property}`);
  // creates a new structure
  // [{name: "propertyValue", events: []}]
  const groupedArrayOfProp = arrayOfProp.reduce((acc, curr) => {
    return [
      ...acc,
      {
        name: curr,
        slug: curr.toLowerCase().trim().replaceAll(" ", ""),
        events: [],
      },
    ];
  }, []);

  // fills the newly created structure
  objectArray?.map((event) => {
    // finds specific index by checking the prop name in
    const objectIndex = groupedArrayOfProp.findIndex((prop) => {
      return prop.name === event[property];
    });
    groupedArrayOfProp[objectIndex].events.push(event);
  });

  return groupedArrayOfProp;
}

//Minimap needs the entire feature as default, in case the pin is moved before a proper location is selected via autofill
export const placeholderFeature = {
  type: "Feature",
  properties: {
    accuracy: "rooftop",
    mapbox_id:
      "dXJuOm1ieGFkcjo3ODFiNWE3MS0yM2Y0LTQzMWUtOTU1Yi03NTVkYzNjYmRlNTI",
    match_code: {
      address_number: "matched",
      street: "matched",
      postcode: "unmatched",
      place: "unmatched",
      region: "not_applicable",
      locality: "not_applicable",
      country: "inferred",
      confidence: "low",
    },
    place_type: ["address"],
    place_name: "Pariser Platz 2, 10117 Berlin, Germany",
    address_number: "2",
    street: "Pariser Platz",
    context: [
      {
        id: "postcode.5115450",
        mapbox_id: "dXJuOm1ieHBsYzpUZzQ2",
        text_en: "10117",
        text: "10117",
      },
      {
        id: "locality.215001658",
        mapbox_id: "dXJuOm1ieHBsYzpETkNxT2c",
        wikidata: "Q2013767",
        text_en: "Mitte",
        language_en: "en",
        text: "Mitte",
        language: "en",
      },
      {
        id: "place.115770",
        mapbox_id: "dXJuOm1ieHBsYzpBY1E2",
        wikidata: "Q64",
        short_code: "DE-BE",
        text_en: "Berlin",
        language_en: "en",
        text: "Berlin",
        language: "en",
      },
      {
        id: "country.8762",
        mapbox_id: "dXJuOm1ieHBsYzpJam8",
        wikidata: "Q183",
        short_code: "de",
        text_en: "Germany",
        language_en: "en",
        text: "Germany",
        language: "en",
      },
    ],
    id: "address.5393048294803276",
    external_ids: {
      carmen: "address.5393048294803276",
      federated: "carmen.address.5393048294803276",
    },
    feature_name: "2 Pariser Platz",
    matching_name: "Pariser Platz 2",
    description: "10117 Berlin, Germany",
    metadata: {
      iso_3166_1: "de",
    },
    language: "en",
    maki: "marker",
    postcode: "10117",
    locality: "Mitte",
    place: "Berlin",
    place_code: "BE",
    country: "Germany",
    country_code: "de",
    full_address: "Pariser Platz 2, 10117 Berlin, Germany",
    address_line1: "Pariser Platz 2",
    address_line2: "",
    address_line3: "",
    address_level1: "",
    address_level2: "Berlin",
    address_level3: "Mitte",
  },
  text_en: "Pariser Platz",
  geometry: {
    type: "Point",
    coordinates: [13.378459, 52.515723],
  },
};
