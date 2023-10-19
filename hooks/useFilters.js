import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function useFilters(
  defaultFilters = { category: "", city: "" }
) {
  const router = useRouter();
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    setFilters(router.query);
  }, [router.isReady, router.query]);

  function onChange(event) {
    router.replace({
      query: {
        ...router.query,
        [event.target.name]:
          event.target.value === "All" ? "" : event.target.value,
      },
    });
  }

  function reset() {
    router.replace({
      query: {
        slug: router.query.slug,
      },
    });
  }

  return {
    filters,
    onChange,
    reset,
  };
}
