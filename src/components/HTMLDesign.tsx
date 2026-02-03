export default function DesignCanvass({
  htmlStringFromApi,
  ref,
}: {
  htmlStringFromApi: string;
  ref: React.RefObject<HTMLIFrameElement | null>;
}) {
  return (
    <iframe
      title="API Content"
      ref={ref}
      srcDoc={htmlStringFromApi}
      style={{ width: "100%", height: "500px", border: "1px solid #ccc" }}
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
