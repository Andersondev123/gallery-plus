import {  useForm } from "react-hook-form";
import Alert from "../../../components/alert";
import Button from "../../../components/button";
import {Dialog, DialogBody, DialogClose, DialogContent, DialogFooter, DialogHeader, DialoTrigger, } from "../../../components/dialog";
import ImagePreview from "../../../components/image-preview";
import InputSingleFile from "../../../components/input-single-file";
import InputText from "../../../components/input-text";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";

import  React, { useState } from "react";
import UseAlbums from "../../albums/hooks/use-albums";
import { photoNewFormSchema, type PhotoNewFormSchema } from "../schemas";
import {zodResolver} from "@hookform/resolvers/zod"
import UsePhoto from "../hooks/use-photo";

interface PhotoNewDialogProps{
    trigger: React.ReactNode;
}
export default function PhotoNewDialog({trigger}:PhotoNewDialogProps){
const [modalOpen, setModalOpen] = useState(false)
const form = useForm<PhotoNewFormSchema>({
    resolver: zodResolver(photoNewFormSchema)// ele vai resolver o formulário com base no Schema
});

const {albums, isLoadingAlbums} = UseAlbums();
const {createPhoto} = UsePhoto()
const [isCreatingPhoto, setIsCreatingPhoto] = React.useTransition()
const file = form.watch("file");
const fileSource = file?.[0] ? URL.createObjectURL(file[0]): undefined;
const albumsIds = form.watch("albumsIds");

React.useEffect(()=>{
    if(!modalOpen){
        form.reset()
    }
},[modalOpen, form])

function handleToggleAlbum(albumId: string){
    const albumsIds = form.getValues("albumsIds") || [];
    const albumSet = new Set(albumsIds);
    if(albumSet.has(albumId)){
        albumSet.delete(albumId)
    }else{
        albumSet.add(albumId)
    }
    form.setValue("albumsIds", Array.from(albumSet))
}

function handleSubmit(payload: PhotoNewFormSchema ){
        setIsCreatingPhoto(async ()=>{
            await createPhoto(payload);
            setModalOpen(false)
        })
}

    return(
       <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialoTrigger asChild>{trigger}</DialoTrigger>
            <DialogContent>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                <DialogHeader>Adicionar foto</DialogHeader>

                <DialogBody className="flex flex-col gap-5">
                    <InputText
                    placeholder="Adicione um título"
                    maxLength={255}
                    error={form.formState.errors.title?.message}
                    {...form.register("title")}
                    />
                    <Alert>Tamanho máximo: 50mb
                         <br/>
                        Você pode selecionar arquivo em PNG, JPG ou JPEG
                    </Alert>
                   <InputSingleFile
                   form={form}
                   allowedExtensions={["png","jpg","jpeg"]}
                   maxFileSizeInMB={50}
                   replaceBy={
                    <ImagePreview src={fileSource}
                        className="w-full h-56"
                    />
                   }
                   error={form.formState.errors.file?.message}
                   {...form.register("file")}
                   />
                   <div className="space-y-3">
                    <Text variant="label-small">Selecionar álbuns</Text>
                    
                    <div className="flex flex-wrap gap-3">
                    {!isLoadingAlbums && albums.length > 0 && albums.map((item)=>(
                        <Button key={item.id} variant={albumsIds?.includes(item.id)? "primary" : "ghost"}
                        size="sm" className="truncate"
                        onClick={()=> handleToggleAlbum(item.id)}
                        >
                            {item.title}
                        </Button>
                    ))}
                    {isLoadingAlbums && Array.from({length: 5}).map((_,index)=>(
                        <Skeleton key={`album-loading${index}`} className="w-20 h-7"/>
                    ))}
                    </div>
                   </div>
                    
                </DialogBody>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button disabled={isCreatingPhoto} variant="secondary">Cancelar</Button>
                    </DialogClose>

                    <Button disabled={isCreatingPhoto} handling={isCreatingPhoto} type="submit">{isCreatingPhoto ? "Adicionado" : "Adicionar"}</Button>
                </DialogFooter>
                </form>
            </DialogContent>
       </Dialog>
    )
}