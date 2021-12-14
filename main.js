const timer = {
    getTime() {
        let formattedTime
        App.time -= 1000

        // Math

        let seconds = (App.time % (60 * 1000)) / 1000
        let minutes = Math.floor(App.time / (60 * 1000))

        // Formatting each part

        let displayMinutes = minutes < 10 ? '0' + minutes : minutes
        let displaySeconds = seconds < 10 ? '0' + seconds : seconds

        formattedTime = `${displayMinutes}:${displaySeconds}`

        App.update(formattedTime)
    },

    startTimer() {
        this.timerInterval = setInterval(this.getTime, 1000)
        DOM.timerButton.textContent = 'STOP'

        DOM.removeStartEvent(DOM.timerButton)
        DOM.addStopEvent(DOM.timerButton)

        DOM.skipTimerButton.classList.remove('hidden')
    },

    stopTimer() {
        clearInterval(this.timerInterval)
        DOM.timerButton.textContent = 'START'

        DOM.removeStopEvent(DOM.timerButton)
        DOM.addStartEvent(DOM.timerButton)

        DOM.skipTimerButton.classList.add('hidden')
    }
}

const DOM = {
    timerDiv: document.querySelector('#timer'),
    timerButton: document.querySelector('#timerButton'),
    skipTimerButton: document.querySelector('.skipTimerButton'),

    addStartEvent(element) {
        // this.start is necessary due to event listeners' properties

        element.addEventListener(
            'click',
            (this.start = () => timer.startTimer())
        )
    },

    addStopEvent(element) {
        element.addEventListener('click', (this.stop = () => timer.stopTimer()))
    },

    removeStartEvent(element) {
        element.removeEventListener('click', this.start)
    },

    removeStopEvent(element) {
        element.removeEventListener('click', this.stop)
    }
}

const App = {
    init() {
        this.time = 1000 * 60 * 25
        DOM.addStartEvent(DOM.timerButton)
    },

    update(time) {
        DOM.timerDiv.textContent = time
    }
}

App.init()
