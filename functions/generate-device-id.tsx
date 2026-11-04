export default function GenerateDeviceId(){
    const time = Date.now().toString(36)
    const random1 = Math.random().toString(36).substring(2,8)
    const random2 = Math.random().toString(36).substring(2,8)

    const deviceId = `${time}${random1}${random2}`
    return deviceId
}