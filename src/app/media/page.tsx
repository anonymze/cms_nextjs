import { getUploadsQuery } from "@/api/uploadQueries";
import Uploads from "./components/Uploads";

// get the data from the server and pass it with props drilling
export default async function Page() {
  const initialData = await getUploadsQuery();
  return <Uploads initialData={initialData} />;
}
