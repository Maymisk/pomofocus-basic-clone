// let time = 0

// function getTime() {
//     time += 1000
//     let seconds = (time % (60 * 1000)) / 1000
//     let minutes = time / (60 * 1000)

//     minutes = String(minutes).split('.')[0]

//     switch (true) {
//         case minutes < 1 && seconds < 10:
//             console.log(`00:0${seconds}`)
//             break

//         case minutes >= 1 && minutes < 10 && seconds >= 10:
//             console.log(`0${minutes}:${seconds}`)
//             break

//         case minutes >= 1 && minutes < 10 && seconds < 10:
//             console.log(`0${minutes}:0${seconds}`)
//             break

//         case minutes >= 10 && seconds < 10:
//             console.log(`${minutes}:0${seconds}`)
//             break

//         default:
//             console.log(`${minutes}:${seconds}`)
//     }
// }
// setInterval(getTime, 1000)
