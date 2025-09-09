import { toast } from "sonner";
import { api } from "../../../helpers/api";
import { useQueryClient } from "@tanstack/react-query";

export default function usePhotoAlbums(){
    const queryClient = useQueryClient()
    async function manageOnPhotoAlbum(photoId: string, albumsIds: string[]){
        try{
            await api.put(`/photos/${photoId}/albums`,{
                albumsIds
            })
            queryClient.invalidateQueries({queryKey: ["photo", photoId]})
            queryClient.invalidateQueries({queryKey: ["photos"]})
            toast.success("Álbums atualizados")
        }catch(error){
            toast.error("Erro ao gerenciar álbums da foto")
            throw(error)
        }
    }
    return{
        manageOnPhotoAlbum
    }
}