function loadDataFromJSON() {
    fetch('/app-data.json') // Используем относительный путь к файлу в папке public
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть не в порядке: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Обновляем элементы на странице
            document.querySelector('.app-image').src = data['app-image'] || ''; // Устанавливаем URL изображения
            document.querySelector('.app-title').textContent = data['app-title'] || ''; // Устанавливаем название приложения
            document.querySelector('.app-developer-name').textContent = data['app-developer-name'] || ''; // Устанавливаем имя разработчика
            document.querySelector('.rate-digit').textContent = data['rate-digit'] || ''; // Устанавливаем рейтинг
            document.querySelector('.star-rate-number').textContent = data['star-rate-number'] || ''; // Устанавливаем количество отзывов
            document.querySelector('.app-wheight-mb').textContent = data['app-wheight-mb'] || ''; // Устанавливаем вес приложения
            document.querySelector('.about-text').textContent = data['about-text'] || ''; // Устанавливаем текст о приложении
            document.querySelector('.score').textContent = data['score'] || ''; // Устанавливаем оценку приложения
            document.querySelector('.reviews-count').textContent = data['reviews-count'] || ''; // Устанавливаем кол-во отзывов
            const ratingLines = document.querySelectorAll('.main-line');
            data.ratings.forEach((width, index) => {
                if (ratingLines[index]) {
                    ratingLines[index].style.width = width; // Устанавливаем ширину
                }
            });
            //слайды с картинками приложения
            const swiperWrapperImgs = document.getElementById('swiper-wrapper-imgs');
            swiperWrapperImgs.innerHTML = '';
            data.slides.forEach(url => {
                const newSlide = document.createElement('div');
                newSlide.classList.add('swiper-slide');
                newSlide.classList.add('swiper-slide-imgs');
                newSlide.innerHTML = `<img src="${url}" alt="Slide image">`;
                swiperWrapperImgs.appendChild(newSlide);
            });

            const swiperWrapperTags = document.getElementById('swiper-wrapper-tags');
            swiperWrapperTags.innerHTML = '';
            data.tags.forEach(tag => {
                const newTag = document.createElement('div')
                newTag.classList.add('swiper-slide');
                newTag.classList.add('swiper-slide-tags');
                newTag.innerHTML = `<p class="tag" style="margin-right: 10px;">${tag}</p>`
                swiperWrapperTags.appendChild(newTag);
            })


            // Загружаем отзывы
            const reviewsContainer = document.querySelector('.reviews-items');
            reviewsContainer.innerHTML = '';
            data.reviews.forEach(review => {
                const newReview = document.createElement('div');
                newReview.classList.add('review');

                const reviewHeader = document.createElement('div');
                reviewHeader.classList.add('review-header');

                const userIcon = document.createElement('img');
                userIcon.src = review.userIcon;
                userIcon.alt = '';

                const userName = document.createElement('p');
                userName.classList.add('review-user-name');
                userName.textContent = review.userName;

                const reviewRate = document.createElement('div');
                reviewRate.classList.add('review-rate');

                const reviewRateStars = document.createElement('div');
                reviewRateStars.classList.add('review-rate-stars');

                for (let i = 0; i < 5; i++) {
                    const star = document.createElement('img');
                    star.src = 'images/rate-star.svg';
                    star.alt = '';
                    reviewRateStars.appendChild(star);
                }

                const date = document.createElement('p');
                date.classList.add('date');
                date.textContent = review.reviewDate;

                const reviewTextElement = document.createElement('p');
                reviewTextElement.classList.add('review-text');
                reviewTextElement.textContent = review.reviewText;

                const helpful = document.createElement('p');
                helpful.classList.add('helpful');
                const helpfulNum = document.createElement('span');
                helpfulNum.classList.add('helpful-num');
                helpfulNum.textContent = review.helpfulUsers;
                helpful.appendChild(helpfulNum);
                helpful.appendChild(document.createTextNode(' people found this helpful'));

                reviewHeader.appendChild(userIcon);
                reviewHeader.appendChild(userName);
                reviewRate.appendChild(reviewRateStars);
                reviewRate.appendChild(date);
                newReview.appendChild(reviewHeader);
                newReview.appendChild(reviewRate);
                newReview.appendChild(reviewTextElement);
                newReview.appendChild(helpful);
                reviewsContainer.appendChild(newReview);
            });
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
        });
}

// Вызываем функцию при загрузке страницы
window.onload = loadDataFromJSON;

function loadDevDataFromJSON() {
    return fetch('/app-data.json') // Используем относительный путь к файлу в папке public
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть не в порядке: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            return data['app-developer-name'] || ''; // Возвращаем имя разработчика
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
            throw error; // Пробрасываем ошибку дальше
        });
}

let developerName;

function loadAndGetDeveloperName() {
    loadDevDataFromJSON()
        .then(name => {
            developerName = name; // Сохраняем имя в переменную
            // console.log('Имя разработчика:', developerName);
            // Теперь вы можете использовать переменную developerName в других частях кода
        })
        .catch(error => {
            console.error('Ошибка при получении имени разработчика:', error);
        });
}

// Вызов функции
loadAndGetDeveloperName();

// Где-то в другом месте кода
document.querySelector('.app-developer-name').textContent = developerName;

// function installApp() {
//     if ('deferredPrompt' in window) {
//       window.deferredPrompt.prompt();
//       window.deferredPrompt.userChoice.then(function(choiceResult) {
//         if (choiceResult.outcome === 'accepted') {
//           console.log('User accepted the install prompt');
//         } else {
//           console.log('User dismissed the install prompt');
//         }
//         window.deferredPrompt = null;
//       });
//     }
//   }

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
});   

var tagSwiper = new Swiper(".tagSwiper", {
    slidesPerView: 'auto',
    spaceBetween: 10,
    freeMode: true,
});   

const installBtn = document.getElementById('installBtn')
let appImage = document.querySelector('.app-image')
let spinner = document.querySelector('.spinner')
let devName = document.querySelector('.app-developer-name')
let devNameValue = devName.innerText
let appWeight = document.querySelector('.app-wheight-mb').innerHTML
let downloadPercent = 0;

// installBtn.addEventListener('click', () => {
//     devName.innerHTML = 'Pending...'
//     installBtn.innerHTML = 'Play'
//     installBtn.classList.add('installing')
//     installBtn.setAttribute('disabled', true)
//     appImage.classList.add('scaleDown')
//     spinner.classList.add('activeSpinner') // Добавляем класс activeSpinner сразу

//     let interval = setInterval(() => {
//         downloadPercent += 2; // Увеличиваем на 2% каждые 100 мс
//         devName.innerHTML = downloadPercent + '% of ' + Number(appWeight) + 'MB';

//         if (downloadPercent >= 100) { 
//             devName.innerHTML = developerName; 
//             spinner.classList.remove('activeSpinner') // Удаляем класс activeSpinner при достижении 100%
//             clearInterval(interval) // Останавливаем интервал
//         }
//     }, 100);

//     setTimeout(() => {
//         installBtn.classList.remove('installing')
//         installBtn.setAttribute('disabled', false)
//         devName.innerHTML = 'Sample Developer'
//         appImage.classList.remove('scaleDown')
//         appImage.classList.add('scaleUp')
//     }, 4000);
//     installApp()
// })

let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        // Предотвращаем отображение стандартного диалогового окна установки PWA
        e.preventDefault();
        // Сохраняем событие, чтобы вызвать его позже
        deferredPrompt = e;
    });

    document.getElementById('installBtn').addEventListener('click', async () => {
        // Если событие доступно
        if (deferredPrompt) {
            // Показываем диалоговое окно установки PWA
            deferredPrompt.prompt();

            // Обрабатываем выбор пользователя
            const choiceResult = await deferredPrompt.userChoice;
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the PWA install prompt');

                // Запускаем таймер для предотвращения перехода
                setTimeout(() => {
                    if (document.visibilityState === 'hidden') {
                        window.location.reload();
                    }
                }, 500);
            } else {
                console.log('User dismissed the PWA install prompt');
            }

            // Событие теперь не нужно, очищаем его
            deferredPrompt = null;
        }
    });

    window.addEventListener('appinstalled', (evt) => {
        console.log('PWA was installed successfully');
        // Не делаем ничего в обработчике
    });
// // Регистрация Service Worker для основного лендинга (если необходимо)
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/pwa/sw.js')
//             .then(registration => {
//                 console.log('Service Worker зарегистрирован с областью:', registration.scope);
//             })
//             .catch(error => {
//                 console.error('Ошибка регистрации Service Worker:', error);
//             });
//     });
// }

// // Проверяем, поддерживает ли браузер PWA
// window.addEventListener('beforeinstallprompt', (e) => {
//     // Предотвращаем показ стандартного диалога
//     e.preventDefault();
//     // Сохраняем событие для показа позже
//     deferredPrompt = e;
//     // Показываем кнопку установки
//     document.getElementById('installBtn').style.display = 'block';
// });

// Обработчик клика по кнопке установки
// document.getElementById('installBtn').addEventListener('click', () => {
//     // Скрываем кнопку
//     // document.getElementById('installBtn').style.display = 'none';
//     // Показываем диалог установки
//     deferredPrompt.prompt();
//     // Ждем, пока пользователь ответит на диалог
//     deferredPrompt.userChoice.then((choiceResult) => {
//         if (choiceResult.outcome === 'accepted') {
//             console.log('Пользователь принял установку PWA');
//         } else {
//             console.log('Пользователь отклонил установку PWA');
//         }
//         deferredPrompt = null;
//     });
// });

// Регистрация Service Worker
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js')
//             .then((registration) => {
//                 console.log('Service Worker зарегистрирован с областью:', registration.scope);
//             })
//             .catch((error) => {
//                 console.error('Ошибка регистрации Service Worker:', error);
//             });
//     });
// }