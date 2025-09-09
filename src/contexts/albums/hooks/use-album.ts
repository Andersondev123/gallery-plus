import { toast } from "sonner";
import type { AlbumNewFormSchema } from "../schemas";
import { api } from "../../../helpers/api";
import type { Album } from "../models/album";
import { useQueryClient } from "@tanstack/react-query";
import UsePhotos from "../../photos/hooks/use-photos";
import usePhotoAlbums from "./use-photo-albums";

export default function UseAlbum(){
    const queryClient = useQueryClient()
    const {photos} = UsePhotos()
    const {manageOnPhotoAlbum} = usePhotoAlbums()
    async function createAlbum(payload: AlbumNewFormSchema) {
        try{
            const {data: album} = await api.post<Album>("/albums", {
                title: payload.title
            })
            if(payload.photosIds && payload.photosIds.length > 0){
                await Promise.all(payload.photosIds.map((itemId)=>{
                    const photoAlbumsIds = photos.find((photo) => photo.id === itemId)
                    ?.albums?.map(album=> album.id)  || []

                    return manageOnPhotoAlbum(itemId, [...photoAlbumsIds, album.id])
                   
                }))
            }
            queryClient.invalidateQueries({queryKey: ["albums"]})
            queryClient.invalidateQueries({queryKey: ["photos"]})
            toast.success("Album criado com sucesso")
        }catch(error){
            toast.error("Erro ao criar álbum")
            throw error
        }
    }
    return{
        createAlbum
    }
}