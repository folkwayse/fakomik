
export default defineEventHandler(async (event) => {
  //   const newGenre = await createNewGenre("New Genre", "Description", false);
  const genres = await fetch('http://localhost:4001/api/genres').then(res => res.json());
  return  genres;
});
