export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  //   const newGenre = await createNewGenre("New Genre", "Description", false);
  const genres = await fetch(config.public.baseURL + "genres").then((res) =>
    res.json()
  );
  return genres;
});
