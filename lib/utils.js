export function unique(array, key) {
  return [...new Set(array?.map((x) => x[key]))];
}

export function getURL(filter = {}) {
  const params = new URLSearchParams();
  filter.category && params.append("category", filter.category);
  filter.city && params.append("city", filter.city);
  return `/api/events${params.size ? `?${params}` : ""}`;
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
