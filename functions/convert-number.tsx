interface Props{
    number:number
}

export default function convertNumber({number}:Props){
    if(Math.abs(number) >=1000000){
        const value = (number/1000000).toFixed(1)+' M';
        return value
    }

    if(Math.abs(number) >=1000){
        const value = (number/1000).toFixed(2)+' K';
        return value
    }
    return number
}