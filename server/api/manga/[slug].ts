export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  //get slug from url

  //   const newGenre = await createNewGenre("New Genre", "Description", false);
  const slug = event.context.params.slug || "";
  
  const data = await fetch(
    config.public.baseURL + "mangas/getmanga/" + slug
  ).then((res) => res.json());
  return data;
});
