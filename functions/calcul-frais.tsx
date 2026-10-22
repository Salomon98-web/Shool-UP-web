interface Props{
    number:number
}

export default function CalculFrais({number}:Props){
    const frais = (number * 2) / 100
    return frais
}