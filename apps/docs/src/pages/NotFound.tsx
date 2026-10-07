interface NotFoundProps {}

export default function NotFound(_props: NotFoundProps) {
  return (
    <section className="not-found">
      <h1>Not found</h1>
      <p>
        This page does not exist. Head back <a href="/">home</a>.
      </p>
    </section>
  );
}
