
const getData = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')

  if (!res.ok) {
    throw new Error('Failed to fetch')
  }

  return res.json();
}

export default async function Page() {
  const todos = await getData();

  return (
      <div>
        {todos.map((todo: any) => {
          return (
            <li key={todo.id}>{todo.title}</li>
          )
        })}
      </div>
  )
}