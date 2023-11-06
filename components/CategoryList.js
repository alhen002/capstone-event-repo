import useSWR from "swr";
import CategoryHighlight from "./CategoryHighlight";
import Loading from "./Loading";
import Error from "./Error";

export default function CategoryList() {
  const {
    data: categories,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/categories");

  if (isLoading) return <Loading />;
  if (error) return <Error>{error.message}</Error>;

  return (
    <>
      {categories?.length ? (
        categories.map((category, index) => (
          <CategoryHighlight key={index} category={category} mutate={mutate} />
        ))
      ) : (
        <p>Sorry, nothing found based on your filters. Please reset.</p>
      )}
    </>
  );
}
