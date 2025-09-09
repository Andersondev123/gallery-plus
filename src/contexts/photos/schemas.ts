
import {z} from "zod"

export const photoNewFormSchema = z.object({
    title: z.string().min(1, {message: "Campo obrigátorio!!"}).max(255),
    file: z.instanceof(FileList).refine(File => File.length > 0,{
        message: "Campo obrigátorio"
    }),
    albumsIds: z.array(z.string().uuid()).optional()
})

export type PhotoNewFormSchema = z.infer<typeof photoNewFormSchema>