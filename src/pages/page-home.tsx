
import Container from "../components/container";
import AlbumsFilter from "../contexts/albums/components/albums-filter";
import UseAlbums from "../contexts/albums/hooks/use-albums";

import PhotosList from "../contexts/photos/components/photos-list";
import UsePhotos from "../contexts/photos/hooks/use-photos";


export default function PageHome(){
    const {albums, isLoadingAlbums} = UseAlbums()
    const {photos, isLoadingPhotos} = UsePhotos()
    return (
        <Container>
            <AlbumsFilter albums={albums}
            loading={isLoadingAlbums}
            className="mb-9" />

            <PhotosList
            photos={photos}
            loading={isLoadingPhotos}
            />
     
        </Container>
        )
 
    
}