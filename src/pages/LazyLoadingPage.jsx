import Spinner from "@/custom_components/Spinner";

const LazyLoadingPage = () => {
  return (
    <section className="h-screen w-full bg-neutral-200 col-center">
      <Spinner />
    </section>
  );
};

export default LazyLoadingPage;
