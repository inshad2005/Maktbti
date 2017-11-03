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
endPoint:'http://maktbti.com/WebServices/' ,
profile:"http://maktbti.com/images/profile/"

}

export const PROD: Environment = {
language:LANGUAGE.ENGLISH,
endPoint:'http://maktbti.com/WebServices/' ,
profile:"http://maktbti.com/images/profile/"
}
export const ENV: Environment= PROD;