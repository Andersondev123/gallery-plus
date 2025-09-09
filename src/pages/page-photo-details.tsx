import { useParams } from "react-router";
import Text from "../components/text";
import Container from "../components/container";

import Skeleton from "../components/skeleton";
import PhotosNavigator from "../contexts/photos/components/photos-navigator";
import ImagePreview from "../components/image-preview";
import Button from "../components/button";
import AlbumsListSelectable from "../contexts/albums/components/albums-list-selectable";
import UseAlbums from "../contexts/albums/hooks/use-albums";
import UsePhoto from "../contexts/photos/hooks/use-photo";
import React from "react";
import type { Photo } from "../contexts/photos/models/photo";




export default function PagePhotoDetails(){
    
    const {id} = useParams()
    const {photo, previousPhotoId, nextPhotoId, isLoadingPhoto, deletePhoto} = UsePhoto(id)
    const [isDeletingPhoto, setIsDeletingPhoto] = React.useTransition();
    const {albums, isLoadingAlbums} = UseAlbums();
    function handleDeletePhoto(){
        setIsDeletingPhoto(async()=>{
            await deletePhoto(photo!.id)
        })
    }

    

   if (!isLoadingPhoto && !photo){
        return(
            <div>
                Foto não encontrada
            </div>
        )
   }
    return(
        <Container>
            <header className="flex items-center justify-between gap-8 mb-8">
                {!isLoadingPhoto ? (
                    <Text as="h2" variant="heading-large">{photo?.title}</Text>
                ) : (
                    <Skeleton className="w-48 h-8"/>
                )}
                <PhotosNavigator previousPhotoId={previousPhotoId} 
                nextPhotoId={nextPhotoId}
                loading={isLoadingPhoto}/>
            </header>

            <div className="grid grid-cols-[21rem_1fr] gap-24">
                <div className="space-y-3">
                    {!isLoadingPhoto ? (
                         <ImagePreview
                        src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`}
                        title={photo?.title}
                        imageClassName="h-[21rem]"
                       
                    />
                    ): (
                        <Skeleton className="h-[21rem]"/>
                    )}
                    {!isLoadingPhoto ? (
                            <Button variant="destructive" 
                            onClick={handleDeletePhoto} 
                            disabled={isDeletingPhoto}
                            >
                                {isDeletingPhoto ? "Excluindo" : "Excluir"}
                            </Button>
                    ): (
                        <Skeleton className="w-20 h-10"/>
                    )}
                 
                </div>
              <div className="py-3">
                    <Text as="h3" variant="heading-medium" className="mb-7">
                        Albuns
                    </Text>
                    <AlbumsListSelectable 
                    photo={photo as Photo}
                    albums={albums} loading={isLoadingAlbums}
                    />
              </div>

            </div>
        </Container>
    )
 
}