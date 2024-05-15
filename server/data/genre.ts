import prisma from "../prisma";

export const createNewGenre = async (name: string, description: string, isMature: boolean): Promise<any> => {
    try {
        const newGenre = await prisma.genre.create({
            data: {
                name: name,
                description: description,
                isMature: isMature
            }
        });
        return newGenre;
    } catch (error) {
        console.error("Error creating new genre: ", error);
        throw error;
    }
}

export const getAllGenres = async (): Promise<any> => {
    try {
        const genres = await prisma.genre.findMany();
        return genres.map(gen => {
            return {
                name: gen.name,
                isMature: gen.isMature
            }
        }) as any;
    } catch (error) {
        console.error("Error getting all genres: ", error);
        return Promise.reject(error);
    }
}