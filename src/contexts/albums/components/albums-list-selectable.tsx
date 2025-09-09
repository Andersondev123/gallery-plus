import React from "react";
import Divider from "../../../components/divider";
import InputCheckbbox from "../../../components/input-checkox";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import type { Photo } from "../../photos/models/photo";
import usePhotoAlbums from "../hooks/use-photo-albums";
import type { Album } from "../models/album";

interface AlbumsListSelectableProps{
    loading?: boolean;
    albums: Album[];
    photo: Photo;
}

export default function AlbumsListSelectable({albums,loading, photo}: AlbumsListSelectableProps){
    const {manageOnPhotoAlbum} = usePhotoAlbums()
    const [isUpdatingPhoto, setIsUpdatingPhoto] = React.useTransition()
    function isChecked(albumId: string){
        return photo?.albums?.some(album=> album.id === albumId)
    }
    function handlePhotoOnAlbums(albumId: string){
        let albumsIds = [];
        if(isChecked(albumId)){
            albumsIds = photo.albums.filter(album => album.id !== albumId).map(album => album.id)
        }else{
            albumsIds = [...photo.albums.map(album=> album.id), albumId]
        }
        setIsUpdatingPhoto(async ()=>{
            await manageOnPhotoAlbum(photo.id, albumsIds)
        })
        
    }
    return(
        <ul className="flex flex-col gap-4">
            {!loading && photo && albums.length > 0 && albums.map((item, index)=>(
                  <li key={item.id}>
                <div className="flex items justify-between gap-1">
                    <Text variant="paragraph-large" className="truncate">{item.title}</Text>
                    <InputCheckbbox
                    defaultChecked={isChecked(item.id)}
                    onChange={()=> handlePhotoOnAlbums(item.id)}
                    disabled={isUpdatingPhoto}
                    />
                </div>
                {index !== albums.length -1 && <Divider className="mt-4"/> }
                
            </li>
            ))}
          {loading && Array.from({length: 5}).map((_,index)=>(
             <li key={`albuns-list-${index}`}>
                <Skeleton className="h-[2.5rem]"/>
            </li>
          ))}
            
          
         
        </ul>
    )
}