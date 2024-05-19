export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    //get slug from url
  
    //   const newGenre = await createNewGenre("New Genre", "Description", false);
    const slug = event.context.params.slug || "";
    console.log(slug)
    const data = await fetch(
      config.public.baseURL + slug
    ).then((res) => res.json());
    return data;
  });
  