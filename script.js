document.addEventListener('DOMContentLoaded', function () {
    const signInBtn = document.getElementById('sign-in-btn');
    const accountBtn = document.getElementById('account-btn');
    const loginModal = document.getElementById('login-modal');
    const accountModal = document.getElementById('account-modal');
    const closeBtns = document.querySelectorAll('.close-btn');
    const loginForm = document.getElementById('login-form');
    const loginSuccessMsg = document.getElementById('login-success');
    const accountLogin = document.getElementById('account-login');
    const logoutBtn = document.getElementById('logout-btn');
    const registerForm = document.getElementById('register-form');
    const registerSuccessMsg = document.getElementById('register-success');

    // Инициализация массива пользователей
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Проверка текущего состояния входа
    if (localStorage.getItem('loggedIn') === 'true') {
        handleLoggedInState();
    }

    if (signInBtn) {
        signInBtn.addEventListener('click', function () {
            loginModal.style.display = 'flex';
        });
    }

    if (accountBtn) {
        accountBtn.addEventListener('click', function () {
            accountModal.style.display = 'flex';
        });
    }

    if (closeBtns) {
        closeBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                closeAllModals();
            });
        });
    }

    window.addEventListener('click', function (event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target === accountModal) {
            accountModal.style.display = 'none';
        }
    });

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            // Поиск пользователя
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                loginSuccessMsg.style.display = 'block';

                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('username', username);

                setTimeout(() => {
                    loginModal.style.display = 'none';
                    handleLoggedInState();
                }, 1000);
            } else {
                alert('Неверный логин или пароль');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('username');
            handleLoggedOutState();

            // Обновление страницы после выхода
            window.location.reload();
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const newUsername = document.getElementById('new-username').value.trim();
            const newPassword = document.getElementById('new-password').value.trim();
            const confirmPassword = document.getElementById('confirm-password').value.trim();

            if (newPassword !== confirmPassword) {
                alert('Пароли не совпадают');
                return;
            }

            // Проверка на уникальность логина
            const userExists = users.some(user => user.username === newUsername);
            if (userExists) {
                alert('Пользователь с таким логином уже существует');
                return;
            }

            // Добавление нового пользователя
            const newUser = { username: newUsername, password: newPassword };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            registerSuccessMsg.style.display = 'block';

            setTimeout(() => {
                window.location.href = 'main.html'; // Переход на главную страницу
            }, 2000);
        });
    }

    function handleLoggedInState() {
        if (signInBtn) signInBtn.style.display = 'none';
        if (accountBtn) accountBtn.style.display = 'inline-block';
        if (accountLogin) {
            const username = localStorage.getItem('username');
            accountLogin.textContent = `Логин: ${username}`;
        }
    }

    function handleLoggedOutState() {
        if (signInBtn) signInBtn.style.display = 'inline-block';
        if (accountBtn) accountBtn.style.display = 'none';
        if (accountLogin) accountLogin.textContent = '';
    }

    function closeAllModals() {
        if (loginModal) loginModal.style.display = 'none';
        if (accountModal) accountModal.style.display = 'none';
    }
});

// Функция для переключения видимости пароля
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
    }
}
