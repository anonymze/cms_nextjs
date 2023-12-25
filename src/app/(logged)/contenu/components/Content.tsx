"use client";

import { getArticlesQuery } from "@/api/queries/articleQueries";
import { useQuery } from "@tanstack/react-query";
import Table from "./Table/Table";

const Content: React.FC = () => {
  // TODO fix bug here on build
  const { data: articles } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticlesQuery,
  });

  
  if (!articles || !articles.length) {
    return <div>Aucune donnée...</div>;
  }
  
  console.log({articles});
  // const ok = Object.keys(!articles[0])

  // console.log('làààà');
  // console.log(ok);
  // console.log(articles[0]);

  return (
    <Table hasActions data={articles} columns={Object.keys(!articles[0])} />
  );
};

export default Content;
