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
        DOM.buttonAudio.play()

        this.timerInterval = setInterval(this.getTime, 1000)
        DOM.timerButton.textContent = 'STOP'

        DOM.timerButton.onclick = () => this.stopTimer()

        DOM.skipTimerButton.style.opacity = '1'
        DOM.timerButton.style.transform = 'translateY(6px)'
        DOM.timerButton.style.boxShadow = 'none'
    },

    stopTimer() {
        DOM.buttonAudio.play()

        clearInterval(this.timerInterval)
        DOM.timerButton.textContent = 'START'

        DOM.timerButton.onclick = () => this.startTimer()

        DOM.skipTimerButton.style.opacity = '0'
        DOM.timerButton.style.transform = 'translateY(-6px)'
        DOM.timerButton.style.boxShadow = 'rgb(235 235 235) 0px 6px 0px'
    }
}

const timerOptions = {
    setCurrentTab(tab) {
        switch (true) {
            case tab === 'Pomodoro':
                DOM.pomoOptions[0].classList.add('Pomodoro')
                DOM.pomoOptions[1].classList.remove('shortBreak')
                DOM.pomoOptions[2].classList.remove('longBreak')
                break

            case tab === 'shortBreak':
                DOM.pomoOptions[0].classList.remove('Pomodoro')
                DOM.pomoOptions[1].classList.add('shortBreak')
                DOM.pomoOptions[2].classList.remove('longBreak')
                break

            case tab === 'longBreak':
                DOM.pomoOptions[0].classList.remove('Pomodoro')
                DOM.pomoOptions[1].classList.remove('shortBreak')
                DOM.pomoOptions[2].classList.add('longBreak')
                break
        }
        // I can't think of something more elegant 😪
    },

    Pomodoro() {
        App.time = 1000 * 25 * 60
        DOM.timerDiv.textContent = '25:00'

        this.setCurrentTab('Pomodoro')

        timer.stopTimer()

        document.body.style.backgroundColor = '#e05454'

        // NAV
        DOM.navOptions.forEach(option => {
            option.style.backgroundColor = '#e06464'
        })

        DOM.horizontalRules.forEach(hr => {
            hr.style.borderColor = '#c84c4c'
        })

        // MAIN
        timerButton.style.color = '#e05454'

        timerContainer.style.backgroundColor = '#e06464'

        // TASKS
        menuButton.style.backgroundColor = '#e06464'

        addTaskButton.style.backgroundColor = '#c84c4c'
    },

    shortBreak() {
        DOM.timerDiv.textContent = '05:00'
        App.time = 1000 * 60 * 5
        this.setCurrentTab('shortBreak')

        timer.stopTimer()

        document.body.style.backgroundColor = '#4c9195'

        // NAV
        DOM.navOptions.forEach(option => {
            option.style.backgroundColor = '#609ca4'
        })

        DOM.horizontalRules.forEach(hr => {
            hr.style.borderColor = '#458488'
        })

        // MAIN
        timerButton.style.color = '#58848c'

        // #58848c active button

        timerContainer.style.backgroundColor = '#609ca4'

        // TASKS
        menuButton.style.backgroundColor = '#609ca4'

        addTaskButton.style.backgroundColor = '#458488'

        // TEXT
        timeToSomething.textContent = 'Time for a break!'
    },

    longBreak() {
        DOM.timerDiv.textContent = '15:00'
        App.time = 1000 * 60 * 15

        this.setCurrentTab('longBreak')

        timer.stopTimer()

        document.body.style.backgroundColor = '#487ca4'

        // NAV
        DOM.navOptions.forEach(option => {
            option.style.backgroundColor = '#608cac'
        })

        DOM.horizontalRules.forEach(option => {
            option.style.borderColor = '#407494'
        })

        // Main
        timerButton.style.color = '#4b7592'

        //active button #4b7592

        timerContainer.style.backgroundColor = '#608cac'

        // Tasks
        menuButton.style.backgroundColor = '#608cac'

        addTaskButton.style.backgroundColor = '#407494'

        // TEXT
        timeToSomething.textContent = 'Time for a break!'
    }
}

const DOM = {
    navOptions: document.querySelectorAll('#rightUl li a'),
    pomoOptions: document.querySelectorAll('#options ul li'),
    horizontalRules: document.querySelectorAll('.hr'),

    timerDiv: document.querySelector('#timer'),
    timerButton: document.querySelector('#timerButton'),
    skipTimerButton: document.querySelector('.skipTimerButton'),
    buttonAudio: new Audio('./assets/clickMinecraft.mp3')
}

const App = {
    init() {
        this.time = 1000 * 60 * 25
        DOM.timerButton.onclick = () => timer.startTimer()
    },

    update(currentTime) {
        DOM.timerDiv.textContent = currentTime
    }
}

App.init()
