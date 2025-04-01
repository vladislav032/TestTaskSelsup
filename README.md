# TestTaskSelsup

## Описание

Этот проект содержит тестовое задание для Selsup. Проект написан на TypeScript и включает в себя HTML. Простое редактирование Модели (ее параметры).
Для более понятного рассмотрения тестового задания сделан деплоид gh-pages (нуу)

## Содержание

- [Установка](#установка)
- [Запуск](#запуск)
- [Настройка среды тестирования](#настройка-среды-тестирования)
- [Тестирование](#тестирование)

## Установка

1. Склонируйте репозиторий на ваш локальный компьютер:
    ```sh
    git clone https://github.com/vladislav032/TestTaskSelsup.git
    ```

2. Перейдите в директорию проекта:
    ```sh
    cd TestTaskSelsup
    ```

3. Установите необходимые зависимости:
    ```sh
    npm install
    ```

## Запуск

1. Для запуска проекта используйте следующую команду:
    ```sh
    npm run dev
    ```

2. Откройте ваш браузер и перейдите по адресу:
    ```
    http://localhost:3000
    ```

## Настройка среды тестирования

1. Установите необходимые зависимости для тестирования:
    ```sh
    npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
    npm install --save-dev jest ts-jest @types/jest
    ```

2. Запустите тесты:
    ```sh
    npm test
    ```

## Тестирование

### Описание тестов

#### `renders with default params and values`

Этот тест проверяет, что компонент `ParamEditor` отображается с параметрами по умолчанию и значениями, такими как текст "Редактор параметров" и поле ввода с меткой "Назначение".

#### `updates param values when input changes`

Этот тест проверяет, что значения параметров обновляются при изменении ввода. Он изменяет значение в поле ввода с меткой "Назначение" и проверяет, что новое значение корректно отображается.

#### `shows model data in modal when button clicked`

Этот тест проверяет, что данные модели отображаются в модальном окне при нажатии кнопки "Показать модель". Он проверяет, что текст "Текущая модель параметров" появляется в модальном окне.

#### `closes modal when footer close button is clicked`

Этот тест проверяет, что модальное окно закрывается при нажатии кнопки закрытия в футере. Он проверяет, что модальное окно становится скрытым и больше не отображается на экране.

Все тесты были пройдены и не выявили никаких проблем с фронт части.

## Дополнительная информация

- [Документация TypeScript](https://www.typescriptlang.org/docs/)
- [Документация Jest](https://jestjs.io/docs/en/getting-started)