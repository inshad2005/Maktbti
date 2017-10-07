export const LANGUAGE = {
ENGLISH: "en",
ARABIC: "arb",
}
export interface Environment 
{
language: string;
endPoint:string;
profile:string;
}

export const DEV: Environment = {
language:LANGUAGE.ARABIC,
endPoint:'http://europa.promaticstechnologies.com/audioLibrary/WebServices/' ,
profile:"http://europa.promaticstechnologies.com/audioLibrary/images/profile/"

}

export const PROD: Environment = {
language:LANGUAGE.ENGLISH,
endPoint:'http://europa.promaticstechnologies.com/audioLibrary/WebServices/' ,
profile:"http://europa.promaticstechnologies.com/audioLibrary/images/profile/"
}
export const ENV: Environment= PROD;