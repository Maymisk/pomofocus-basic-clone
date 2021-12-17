const Modal = {
    toggleTaskModal() {
        taskModal.classList.toggle('hidden')
        addTaskButton.classList.toggle('hidden')

        taskMenuModal.classList.add('hidden')
        noteInput.classList.add('hidden')
        addNoteButton.classList.remove('hidden')

        form.clearFields()
    },

    toggleTaskMenuModal() {
        taskMenuModal.classList.toggle('hidden')

        taskModal.classList.add('hidden')

        form.clearFields()
    },

    toggleNoteInput() {
        noteInput.classList.toggle('hidden')
        addNoteButton.classList.toggle('hidden')
    }
}

const form = {
    tasks: [],

    taskDescriptionInput: document.querySelector('#workingOnInput'),

    actInput: document.querySelector('#actInput'),

    pomodoroQuantityInput: document.querySelector('#quantityPomodoros'),

    noteInput: document.querySelector('#noteInput'),

    getValues() {
        return {
            taskDescription: this.taskDescriptionInput.value.trim(),
            act: this.actInput.value,
            pomodoroQuantity: this.pomodoroQuantityInput.value,
            note: this.noteInput.value
        }
    },

    clearFields() {
        this.taskDescriptionInput.value = ''
        this.actInput.value = '0'
        this.pomodoroQuantityInput.value = '1'
        this.noteInput.value = ''
    },

    submit(event) {
        event.preventDefault()
        DOM.clearTaskDisplay()

        this.tasks.push(this.getValues())

        App.reloadTasks()

        Modal.toggleTaskModal()
        this.clearFields()
    },

    increasePomodoroQuantityValue() {
        let newValue = Number(this.pomodoroQuantityInput.value)
        newValue += 1
        this.pomodoroQuantityInput.value = newValue.toString()
    },

    decreasePomodoroQuantityValue() {
        let newValue = Number(this.pomodoroQuantityInput.value)
        if (newValue === 1) return
        newValue -= 1
        this.pomodoroQuantityInput.value = newValue.toString()
    }
}

const timer = {
    getTime() {
        let formattedTime

        if (App.time === 0) {
            App.alarmClockAudio.play()
            timer.changeTimer()
            return
        }

        App.time -= 1000

        // Math

        let seconds = (App.time % (60 * 1000)) / 1000
        let minutes = Math.floor(App.time / (60 * 1000))

        // Formatting each part

        let displayMinutes = minutes < 10 ? '0' + minutes : minutes
        let displaySeconds = seconds < 10 ? '0' + seconds : seconds

        formattedTime = `${displayMinutes}:${displaySeconds}`

        App.updateTimer(formattedTime)
    },

    startTimer() {
        App.buttonAudio.play()

        this.timerInterval = setInterval(this.getTime, 1000)
        timerButton.textContent = 'STOP'

        timerButton.onclick = () => this.stopTimer()

        DOM.skipTimerButton.style.opacity = '1'
        timerButton.style.transform = 'translateY(6px)'
        timerButton.style.boxShadow = 'none'
    },

    stopTimer() {
        App.buttonAudio.play()

        clearInterval(this.timerInterval)
        timerButton.textContent = 'START'

        timerButton.onclick = () => this.startTimer()

        DOM.skipTimerButton.style.opacity = '0'
        timerButton.style.transform = 'translateY(-6px)'
        timerButton.style.boxShadow = 'rgb(235 235 235) 0px 6px 0px'
    },

    changeTimer() {
        // Changes the timer to Pomodoro, Short Break or Long Break

        App.checkTab()
        switch (true) {
            case App.pomodoroTabCheck && App.counterLongCheck:
                App.counter += 1
                timerOptions.longBreak()
                break

            case App.pomodoroTabCheck:
                App.counter += 1
                timerOptions.shortBreak()
                break

            case App.shortBreakTabCheck || App.longBreakTabCheck:
                timerOptions.Pomodoro()
                break
        }
    },

    resetTimer() {
        // Resets the current timer
        App.checkTab()
        switch (true) {
            case App.pomodoroTabCheck:
                timerOptions.Pomodoro()
                break

            case App.shortBreakTabCheck:
                timerOptions.shortBreak()
                break

            case App.longBreakTabCheck:
                timerOptions.longBreak()
                break
        }
    },

    skipTimer() {
        this.stopTimer()

        if (
            confirm(
                'Are you sure you want to finish the round early? (The remaining time will not be counted in the report.)'
            )
        ) {
            this.changeTimer()
            return
        }

        this.startTimer()
    }
}

const timerOptions = {
    Pomodoro() {
        style.setPomodoroStyle()

        App.currentTab = 'Pomodoro'
        App.time = 1000 * 60 * 25
        App.updateTimer('25:00')

        timer.stopTimer()
    },

    shortBreak() {
        style.setShortBreakStyle()

        App.currentTab = 'shortBreak'
        App.time = 1000 * 60 * 5
        App.updateTimer('05:00')

        timer.stopTimer()
    },

    longBreak() {
        style.setLongBreakStyle()

        App.currentTab = 'longBreak'
        App.time = 1000 * 60 * 15
        App.updateTimer('15:00')

        timer.stopTimer()
    }
}

const style = {
    changingElements: [
        document.body,
        // NAV
        document.querySelector('#rightUl li:nth-child(1) a'),
        document.querySelector('#rightUl li:nth-child(2) a'),
        document.querySelector('#rightUl li:nth-child(3) a'),
        // TABS
        document.querySelector('#options ul li:nth-child(1)'),
        document.querySelector('#options ul li:nth-child(2)'),
        document.querySelector('#options ul li:nth-child(3)'),
        // HORIZONTAL RULES
        document.querySelector('body .hr'),
        document.querySelector('#tasksContainer .hr'),
        // MAIN
        document.querySelector('#timerContainer'),
        document.querySelector('#timerButton'),
        // TASKS
        document.querySelector('#menuButton'),
        document.querySelector('#addTaskButton'),
        document.querySelector('#timeToSomething')
    ],

    setPomodoroStyle() {
        this.changingElements.forEach(element => {
            element.classList.remove(`${App.currentTab}`)
            element.classList.add('Pomodoro')
        })

        timeToSomething.textContent = 'Time to focus!'
    },

    setShortBreakStyle() {
        this.changingElements.forEach(element => {
            element.classList.remove(`${App.currentTab}`)
            element.classList.add('shortBreak')
        })

        timeToSomething.textContent = 'Time for a break!'
    },

    setLongBreakStyle() {
        this.changingElements.forEach(element => {
            element.classList.remove(`${App.currentTab}`)
            element.classList.add('longBreak')
        })
    }
}

const DOM = {
    timerDiv: document.querySelector('#timer'),
    skipTimerButton: document.querySelector('.skipTimerButton'),

    createTask(object) {
        let innerHtml

        if (object.note === '') {
            innerHtml = `
        <div id="taskTextContainer">
                        <img src="./assets/icon.png" alt="icon" />
                        <span>${object.taskDescription}</span>
                        
                        <div>
                            <span>${object.act}</span>
                            <span>/</span>
                            <span>${object.pomodoroQuantity}</span>
                    
                            <a href="#">
                                <img
                                    src="./assets/vertical-ellipsis.png"
                                    alt="Three dots"
                                />
                            </a>
                        </div>
                    </div>`
        } else {
            innerHtml = `
        <div id="taskTextContainer">
                        <img src="./assets/icon.png" alt="icon" />
                        <span>${object.taskDescription}</span>
                        
                        <div>
                            <span>${object.act}</span>
                            <span>/</span>
                            <span>${object.pomodoroQuantity}</span>
                    
                            <a href="#">
                                <img
                                    src="./assets/vertical-ellipsis.png"
                                    alt="Three dots"
                                />
                            </a>
                        </div>
                    </div>
                    <div id="taskNote">
                    ${object.note}
                    </div>`
        }

        return innerHtml
    },

    insertTask(taskElement) {
        let div = document.createElement('div')
        let addTaskButton = document.querySelector('#addTaskButton')

        div.classList.add('task')
        div.innerHTML = taskElement

        tasksContainer.insertBefore(div, addTaskButton)
    },

    clearTaskDisplay() {
        let tasks = document.querySelectorAll('.task')
        tasks.forEach(task => {
            task.remove()
        })
    },

    clearAllTasks() {
        form.tasks = []
        this.clearTaskDisplay()
    },

    deleteFiishedTasks() {}
}

const App = {
    init() {
        // BASIC TIMER INFO
        this.time = 1000 * 60 * 25
        this.counter = 1

        this.currentTab = 'Pomodoro'
        style.setPomodoroStyle()

        this.addEventListeners()
        this.setAudios()
    },

    updateTimer(currentTime) {
        DOM.timerDiv.textContent = currentTime
        counter.textContent = `#${this.counter}`
    },

    reloadTasks() {
        form.tasks.forEach(task => {
            DOM.insertTask(DOM.createTask(task))
        })
    },

    checkTab() {
        // This function is to update/check the app's current tab
        // variables used in changeTimer() and resetTimer()

        this.pomodoroTabCheck = this.currentTab === 'Pomodoro' ? true : false

        this.shortBreakTabCheck =
            this.currentTab === 'shortBreak' ? true : false

        this.longBreakTabCheck = this.currentTab === 'longBreak' ? true : false

        this.counterLongCheck = (this.counter + 1) % 4 === 0 ? true : false
    },

    addEventListeners() {
        // TIMER
        timerButton.onclick = () => timer.startTimer()
        DOM.skipTimerButton.onclick = () => timer.skipTimer()

        // TABS
        pomodoroTab.onclick = () => timerOptions.Pomodoro()
        shortBreakTab.onclick = () => timerOptions.shortBreak()
        longBreakTab.onclick = () => timerOptions.longBreak()

        // BUTTONS
        menuButton.onclick = () => Modal.toggleTaskMenuModal()
        addTaskButton.onclick = () => Modal.toggleTaskModal()
        cancelButton.onclick = () => Modal.toggleTaskModal()

        increaseQuantity.onclick = () => form.increasePomodoroQuantityValue()

        decreaseQuantity.onclick = () => form.decreasePomodoroQuantityValue()

        addNoteButton.onclick = () => Modal.toggleNoteInput()

        // TASK MODAL BUTTONS
        clearAllTasks.onclick = () => DOM.clearAllTasks()
        clearFinishedTasks.onclick = () => null
        resetCounter.onclick = () => {
            this.counter = 1
            counter.textContent = `#${this.counter}`
        }

        resetTimer.onclick = () => {
            timer.resetTimer()
        }
    },

    setAudios() {
        this.alarmClockAudio = new Audio('./assets/alarm_clock.mp3')
        this.buttonAudio = new Audio('./assets/clickMinecraft.mp3')
    }
}

App.init()
