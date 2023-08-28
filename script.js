const emailInput = document.querySelector('#email-input')
const validEmailRequired = document.querySelector('.valid-email-required')
const subscribeButton = document.querySelector('.subscribe-button')
const mainMenuContainer = document.querySelector('.main-menu-container')
const subscribedContainer = document.querySelector('.subscribed-container')
const dismissMessageButton = document.querySelector('.dismiss-message-button')
const confirmationMailSpan = document.querySelector('.confirmation-mail-span')
const TIMEOUT_IDS = []

function pause(miliseconds) {
    return new Promise(res => {
        let id = setTimeout(() => {
            res()
        }, miliseconds);
        TIMEOUT_IDS.push(id)
    })
}

async function mainMenuSubscribedSwitch() {
    confirmationMailSpan.textContent = emailInput.value
    if (this.innerText === 'Dismiss message') {
        subscribedContainer.style.opacity = '0'
        await pause(500)
        subscribedContainer.style.display = 'none'
        mainMenuContainer.style.display = 'grid'
        mainMenuContainer.style.opacity = '1'
    }
    else if (emailInput.checkValidity()) {
        mainMenuContainer.style.opacity = '0'
        await pause(500)
        mainMenuContainer.style.display = 'none'
        subscribedContainer.style.display = 'flex'
        subscribedContainer.style.opacity = '1'
    }
    else {
        emailInput.classList.remove('email-input-style')
        emailInput.classList.add('email-input-invalid-style')
        validEmailRequired.style.display = 'block'
    }
}

emailInput.addEventListener('click', () => {
    emailInput.classList.remove('email-input-invalid-style')
    emailInput.classList.add('email-input-style')
    validEmailRequired.style.display = 'none'
})

emailInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') mainMenuSubscribedSwitch()
})

subscribeButton.addEventListener('click', mainMenuSubscribedSwitch)
dismissMessageButton.addEventListener('click', mainMenuSubscribedSwitch)