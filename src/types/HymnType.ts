type HymnType = {
    id:number,
    hymnal_number:number,
    first_line:string,
    title:string,
    author:string,
    meter:string,
    language:string,
    pub_date:string,
    copyright:string,
    tune_name:string,
    arranger:string,
    key:string,
    source:string,
    audio_rec:string,
    tune_id:number,
    service_date?:string,
}

export default HymnType