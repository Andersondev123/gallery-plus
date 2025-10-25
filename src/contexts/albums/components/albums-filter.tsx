import Button from "../../../components/button";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import UsePhotos from "../../photos/hooks/use-photos";
import type { Album } from "../models/album";
import { Trash2 } from "lucide-react";
import cx from "classnames";
import UseAlbum from "../hooks/use-album";

interface AlbumsFilterProps extends React.ComponentProps<"div">{
    albums: Album[];
    loading?: boolean;
}
export default function AlbumsFilter({albums, loading, className, ...props}:AlbumsFilterProps){
    const { filters } = UsePhotos();
    const {deleteAlbum} = UseAlbum();
    
    function handleDeleteAlbum(album: string){
        deleteAlbum(album)
    }
        return(
            <div className={cx("flex items-center gap-3.5 overflow-x-auto", className)}{...props}
            >
                <Text variant="heading-small">Álbuns</Text>
                
                <div className="flex gap-3">
                    
                    {!loading ? (
                    <>
                    <Button 
                    variant={filters.albumId === null ? "primary" : "ghost"}
                    size="sm" 
                    className="cursor-pointer"
                    onClick={()=> filters.setAlbumId(null)}
                    >
                        Todos
                    </Button>
                     {albums.map((album) => (
                    <div key={album.id} className="flex items-center gap-2">
                        <Button
                        variant={filters.albumId === album.id ? "primary" : "ghost"}
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => filters.setAlbumId(album.id)}
                        >
                        {album.title}
                        </Button>
                        <Button
                        size="sm"
                        className="p-1"
                        onClick={() => handleDeleteAlbum(album.id)}
                        title="Excluir álbum"
                        >
                        <Trash2 size={16} strokeWidth={2}/>
                        </Button>
                    </div>
                    ))}
                     </>
                    ):(
                        Array.from({length: 5}).map((_,index)=>(
                           <Skeleton className="w-28 h-7" key={`album-button-loading${index}`}/> 
                        ))
                     )}
                     
                </div>
            </div>
        )
}