import { getUploadsQuery } from "@/api/uploadQueries";
import Uploads from "./components/Uploads";

// get the data from the server and pass it with props drilling
export default async function Page() {
  // handle the cache of something...
  const initialData = await getUploadsQuery();
  return <Uploads initialData={initialData} />;
}
