//* Components
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import CategoryHighlight from "@/components/CategoryHighlight";

export default function HomePage({ groupedCategoryEvents, isLoading, error }) {
  console.log("groupedCategoryEvents:", groupedCategoryEvents);
  if (isLoading) return <Loading />;

  if (error) return <Error>{error.message}</Error>;
  return (
    <>
      {groupedCategoryEvents.map((category) => (
        <CategoryHighlight key={category.name} category={category} />
      ))}
    </>
  );
}
