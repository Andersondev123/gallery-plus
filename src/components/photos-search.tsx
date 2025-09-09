import InputText from "./input-text";
import SearchIcon from "../assets/icons/search.svg?react"
import React from "react";
import { useState } from "react";
import { debounce } from "../helpers/utils";
import UsePhotos from "../contexts/photos/hooks/use-photos";

export default function PhotoSearch(){
    const [inputValue, setInputValue] = useState("");
    const {filters} = UsePhotos();

    const debauncedSetValue = React.useCallback(
        debounce((value: string)=> {filters.setQ(value)},200),[filters.setQ]
    );
    function handleInputChange(e:  React.ChangeEvent<HTMLInputElement>){
        const value = e.target.value;
        
        setInputValue(value)
        debauncedSetValue(value)
    }
    return <InputText 
    icon={SearchIcon}
    placeholder="Buscar fotos"
    className="flex-1"
    value={inputValue}
    onChange={handleInputChange}
    />
}