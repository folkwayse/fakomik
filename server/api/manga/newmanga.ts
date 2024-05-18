export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  //   const newGenre = await createNewGenre("New Genre", "Description", false);
  const data = await fetch(config.public.baseURL + "mangas/newmanga").then(
    (res) => res.json()
  );
  return data;
});
