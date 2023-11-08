import { getUploadsQuery } from "@/api/uploadQueries";
import Uploads from "./components/Uploads";

// get the data from the server then hydrate it on children
// you can props drilling with initial data too
export default async function Page() {
  const uploads = await getUploadsQuery();

  return (
    <Uploads initialData={uploads} />
  );
}
